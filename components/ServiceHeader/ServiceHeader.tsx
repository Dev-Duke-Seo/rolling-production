'use client';

import classNames from 'classnames/bind';
import { useParams } from 'next/navigation';

import { UrlString } from '@apis/types/Recipient';
import EmojiIconComponent from '@icons/add-24.svg?component';
import ArrowIcon from '@icons/arrow_down.svg?component';
import ShareIcon from '@icons/share-24.svg?component';

import Button from '@components/Buttons/Button';
import MenuList from '@components/MenuList';
import Popover from '@components/Popover';
import ProfileImageList from '@components/ServiceHeader/ProfileImageList';

import { usePopover } from '@hooks/usePopover';
import { useToast } from '@hooks/useToast';

import EmojiList from './EmojiService/EmojiList';
import EmojiService from './EmojiService/EmojiService';
import styles from './ServiceHeader.module.scss';

const cx = classNames.bind(styles);

interface ServiceHeaderProps {
  title: string;
  messageCount: number;
  profileImages: UrlString[] | null;
  recipientId?: number;
}

export default function ServiceHeader({
  title,
  messageCount,
  profileImages,
  recipientId: propRecipientId,
}: ServiceHeaderProps) {
  const params = useParams<{ id: string }>();
  const recipientId = propRecipientId ?? Number(params?.id);

  const { showSuccessToast, showToastWithDurationAndType } = useToast();

  // 이모지 리스트를 가져오는 함수
  // 이모지 증가 핸들러
  const copyCurrentUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    showSuccessToast('URL이 복사되었습니다.');
  };

  const failToShare = () => {
    showToastWithDurationAndType('URL 공유에 실패했습니다.', 3000, 'error');
  };

  const {
    togglePopover: toggleEmojiList,
    popoverRef: emojiListRef,
    togglePopover: setOpenEmojiList,
    isPopoverOpen: isEmojiListOpen,
  } = usePopover();

  const {
    togglePopover: toggleShare,
    popoverRef: shareRef,
    togglePopover: setOpenShare,
    isPopoverOpen: isShareOpen,
  } = usePopover();

  const {
    togglePopover: toggleAddEmoji,
    popoverRef: addEmojiRef,
    togglePopover: setOpenAddEmoji,
    isPopoverOpen: isAddEmojiOpen,
  } = usePopover();

  return (
    <div className={cx('service-header')}>
      <div className={cx('service-header-container')}>
        <h2>
          To.<span>{title}</span>
        </h2>
        <div className={cx('service-contents')}>
          <div className={cx('message-info')}>
            <ProfileImageList imageUrls={profileImages} selectionType={'header'} messageCount={messageCount} />
            <p className={cx('post-count')}>
              <span>{messageCount}</span>명이 작성했어요!
            </p>
          </div>

          <div className={cx('horizontal-line')} />

          <div className={cx('service-box')}>
            <div className={cx('emoji-service')}>
              <EmojiList recipientId={Number(recipientId)} gridColumns={3} limit={3} />
              <button type='button' onClick={toggleEmojiList}>
                <ArrowIcon />
              </button>
              <Popover
                popoverRef={emojiListRef}
                setIsPopoverOpen={setOpenEmojiList}
                isPopoverOpen={isEmojiListOpen}
                verticalPadding={2.4}
                horizontalPadding={2.4}
              >
                <EmojiList recipientId={Number(recipientId)} gridColumns={3} />
              </Popover>
            </div>
            <div className={cx('buttons')}>
              <Button type={'outlined'} size={36} handleClickButton={toggleAddEmoji}>
                <EmojiIconComponent /> <span className={cx('add-emoji-text')}>추가</span>
              </Button>
              <Popover popoverRef={addEmojiRef} setIsPopoverOpen={setOpenAddEmoji} isPopoverOpen={isAddEmojiOpen}>
                <EmojiService recipientId={Number(recipientId)} />
              </Popover>
            </div>
            <div className={cx('horizontal-line')} />

            <Button type={'outlined'} handleClickButton={toggleShare} size={36}>
              <ShareIcon />
            </Button>
            <Popover popoverRef={shareRef} setIsPopoverOpen={setOpenShare} isPopoverOpen={isShareOpen}>
              <div className={cx('popover-size-container')}>
                <MenuList
                  menuList={[
                    { label: '카카오톡 공유하기', onClick: failToShare },
                    { label: 'URL 공유하기', onClick: copyCurrentUrl },
                  ]}
                />
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
