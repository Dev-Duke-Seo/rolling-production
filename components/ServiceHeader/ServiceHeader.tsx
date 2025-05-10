'use client';

import classNames from 'classnames/bind';
import { useParams } from 'next/navigation';

import { UrlString } from '@apis/types/Recipient';

import EmojiReactionSection from './EmojiReactionSection/EmojiReactionSection';
import ProfileImageList from './ProfileImageList';
import styles from './ServiceHeader.module.scss';
import ShareButtonMenu from './ShareButtonMenu/ShareButtonMenu';

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
            <EmojiReactionSection recipientId={recipientId} />
            <div className={cx('horizontal-line')} />
            <ShareButtonMenu title={title} recipientId={recipientId} />
          </div>
        </div>
      </div>
    </div>
  );
}
