'use client';

import classNames from 'classnames/bind';
import Link from 'next/link';

import { Recipient, UrlString } from '@apis/types/Recipient';
import { ColorchipColors } from '@constants/COLORS';
import PatternBeige from '@icons/pattern-beige.svg?component';
import PatternBlue from '@icons/pattern-blue.svg?component';
import PatternGreen from '@icons/pattern-green.svg?component';
import PatternPurple from '@icons/pattern-purple.svg?component';

import EmojiList from '@components/ServiceHeader/EmojiService/EmojiList';
import ProfileImageList from '@components/ServiceHeader/ProfileImageList';

import styles from './Card.module.scss';

const cx = classNames.bind(styles);

type CardProps = Omit<Recipient, 'createdAt'> & {
  backgroundPosition?: string;
  backgroundSize?: string;
  backgroundImageURL?: UrlString | null;
  backgroundColor?: ColorchipColors;
};

export default function Card({
  backgroundColor,
  name,
  messageCount,
  id,
  backgroundImageURL = null,
  backgroundPosition = 'center',
  backgroundSize = 'cover',
}: CardProps) {
  const pattern = selectPattern(backgroundColor as ColorchipColors);
  const hasBackgroundImage = backgroundImageURL !== null;

  const handleEmojiClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleEmojiHover = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link href={`/post/${id}`} className={cx('card-link')}>
      <article
        className={cx('card', hasBackgroundImage && 'background-image', backgroundColor as ColorchipColors)}
        style={
          hasBackgroundImage
            ? ({
                backgroundImage: `url(${backgroundImageURL})`,
                '--bg-position': backgroundPosition,
                '--bg-size': backgroundSize,
              } as React.CSSProperties)
            : undefined
        }
      >
        <header className={cx('post-info')}>
          <h1 className={cx('recipient')}>To.{name} </h1>
          <ProfileImageList imageUrls={[]} />
          <p className={cx('post-count')}>
            <span>{messageCount}</span>명이 작성했어요!
          </p>
        </header>

        <footer className={cx('emoji-area')}>
          <div className={cx('horizontal-line')} />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div onClick={handleEmojiClick} onMouseEnter={handleEmojiHover} role='button' tabIndex={0}>
            <EmojiList gridColumns={3} recipientId={id} limit={3} />
          </div>
        </footer>

        {!hasBackgroundImage && <div className={cx('pattern')}>{pattern}</div>}
      </article>
    </Link>
  );
}

function selectPattern(color: ColorchipColors) {
  switch (color) {
    case 'purple':
      return <PatternPurple />;
    case 'blue':
      return <PatternBlue />;
    case 'green':
      return <PatternGreen />;
    case 'beige':
      return <PatternBeige />;
    default:
      return null;
  }
}
