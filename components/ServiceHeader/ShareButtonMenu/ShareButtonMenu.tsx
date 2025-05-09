import React, { useEffect } from 'react';

import classNames from 'classnames/bind';

import ShareIcon from '@icons/share-24.svg?component';

import Button from '@components/Buttons/Button';
import MenuList from '@components/MenuList';
import Popover from '@components/Popover';

import { usePopover } from '@hooks/usePopover';
import { useToast } from '@hooks/useToast';

import styles from './ShareButtonMenu.module.scss';

const cx = classNames.bind(styles);

const KAKAO_SDK = 'https://developers.kakao.com/sdk/js/kakao.js';
const KAKAO_TEMPLATE_ID = process.env.NEXT_PUBLIC_KAKAO_TEMPLATE_ID;

// 카카오 SDK 로더 컴포넌트
const KakaoSDKLoader = () => {
  useEffect(() => {
    // 이미 로드된 스크립트가 있는지 확인
    if (document.querySelector(`script[src="${KAKAO_SDK}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.src = KAKAO_SDK;
    script.async = true;
    script.crossOrigin = 'anonymous'; // CORS 문제 해결
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
      }
    };
    document.head.appendChild(script);

    return () => {
      // cleanup은 필요하지 않음 - 스크립트는 페이지가 살아있는 동안 유지
    };
  }, []);

  return null;
};

interface SharePopoverProps {
  title: string;
  recipientId: number;
  isOpen: boolean;
  popoverRef: React.MutableRefObject<null>;
  setIsOpen: (isOpen: boolean) => void;
}

// 공유 팝오버 컴포넌트
const SharePopover = ({ title, recipientId, isOpen, popoverRef, setIsOpen }: SharePopoverProps) => {
  const { showSuccessToast, showToastWithDurationAndType } = useToast();

  const copyCurrentUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    showSuccessToast('URL이 복사되었습니다.');
  };

  const shareToKakao = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendCustom({
        templateId: KAKAO_TEMPLATE_ID,
        templateArgs: {
          RECIPIENT: title,
          RECIPIENT_ID: recipientId,
        },
      });
    } else {
      showToastWithDurationAndType('카카오 SDK 초기화 실패', 3000, 'error');
    }
  };

  return (
    <Popover popoverRef={popoverRef} setIsPopoverOpen={setIsOpen} isPopoverOpen={isOpen}>
      <div className={cx('popover-size-container')}>
        <MenuList
          menuList={[
            { label: '카카오톡 공유하기', onClick: shareToKakao },
            { label: 'URL 공유하기', onClick: copyCurrentUrl },
          ]}
        />
      </div>
    </Popover>
  );
};

interface ShareButtonMenuProps {
  title: string;
  recipientId: number;
}

export default function ShareButtonMenu({ title, recipientId }: ShareButtonMenuProps) {
  const {
    togglePopover: toggleShare,
    popoverRef: shareRef,
    togglePopover: setOpenShare,
    isPopoverOpen: isShareOpen,
  } = usePopover();

  return (
    <div className={cx('share-button-menu')}>
      <KakaoSDKLoader />

      <Button type={'outlined'} handleClickButton={toggleShare} size={36}>
        <ShareIcon />
      </Button>

      <SharePopover
        title={title}
        recipientId={recipientId}
        isOpen={isShareOpen}
        popoverRef={shareRef}
        setIsOpen={setOpenShare}
      />
    </div>
  );
}
