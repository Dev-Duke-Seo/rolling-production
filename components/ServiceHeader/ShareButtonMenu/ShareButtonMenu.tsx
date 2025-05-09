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

interface ShareButtonMenuProps {
  title: string;
  recipientId: number;
}

export default function ShareButtonMenu({ title, recipientId }: ShareButtonMenuProps) {
  const { showSuccessToast, showToastWithDurationAndType } = useToast();

  const {
    togglePopover: toggleShare,
    popoverRef: shareRef,
    togglePopover: setOpenShare,
    isPopoverOpen: isShareOpen,
  } = usePopover();

  // 카카오 SDK 초기화
  useEffect(() => {
    const script = document.createElement('script');
    script.src = KAKAO_SDK;
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
    <div className={cx('share-button-menu')}>
      <Button type={'outlined'} handleClickButton={toggleShare} size={36}>
        <ShareIcon />
      </Button>
      <Popover popoverRef={shareRef} setIsPopoverOpen={setOpenShare} isPopoverOpen={isShareOpen}>
        <div className={cx('popover-size-container')}>
          <MenuList
            menuList={[
              { label: '카카오톡 공유하기', onClick: shareToKakao },
              { label: 'URL 공유하기', onClick: copyCurrentUrl },
            ]}
          />
        </div>
      </Popover>
    </div>
  );
}
