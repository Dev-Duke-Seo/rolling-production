'use client';

import classNames from 'classnames/bind';

import { UrlString } from '@apis/types/Recipient';

import ProfileImageItem from '@components/ServiceHeader/ProfileImageItem';

import styles from './ProfileImageList.module.scss';

const cx = classNames.bind(styles);

interface ProfileImageListProps {
  imageUrls: UrlString[] | null;
  selectionType?: 'selection' | 'header';
  onClick?: (imageUrl: string) => void;
  messageCount?: number;
}

export default function ProfileImageList({
  imageUrls,
  selectionType = 'selection',
  onClick,
  messageCount,
}: ProfileImageListProps) {
  return (
    <ol className={cx('profile-image-list')}>
      {imageUrls?.map((item, index) => (
        <ProfileImageItem
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          type={'profile'}
          imageUrl={item.toString()}
          selectionType={selectionType}
          onClick={() => {
            onClick?.(item.toString());
          }}
        />
      ))}
      {selectionType === 'header' && messageCount && messageCount > 3 && (
        <ProfileImageItem key={'count'} type={'count'} count={messageCount - 3} />
      )}
    </ol>
  );
}
