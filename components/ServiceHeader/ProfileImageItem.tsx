import classNames from 'classnames/bind';
import Image from 'next/image';

import CircleIcon from '@icons/ellipse13.svg?component';

import styles from './ProfileImageItem.module.scss';

const cx = classNames.bind(styles);

export interface ProfileImageItemProps {
  type: 'profile' | 'count' | 'custom';
  imageUrl?: string;
  count?: number;
  selectionType?: 'selection' | 'header' | 'custom';
  imageSize?: number;
  onClick?: () => void;
}

export const DEFAULT_PROFILE_IMAGE = '/images/default-profile.png';

export default function ProfileImageItem({
  type = 'profile',
  imageUrl = DEFAULT_PROFILE_IMAGE,
  count,
  selectionType = 'selection',
  imageSize,
  onClick,
}: ProfileImageItemProps) {
  return (
    <button className={cx('profile-image-item')} onClick={onClick} type='button'>
      {type === 'profile' ? (
        <>
          <div
            className={cx('image-container', {
              selection: selectionType === 'selection',
            })}
            style={
              selectionType === 'custom' && imageSize
                ? { width: `${imageSize}rem`, height: `${imageSize}rem` }
                : undefined
            }
          >
            <Image className={cx('profile-image')} src={imageUrl!} alt={'profile-image'} fill sizes={'100%'} />
          </div>
        </>
      ) : (
        <div className={cx('count-box')}>
          <CircleIcon />
          <p>
            +<span>{count}</span>
          </p>
        </div>
      )}
    </button>
  );
}
