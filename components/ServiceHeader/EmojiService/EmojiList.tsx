'use client';

import React from 'react';

import classNames from 'classnames/bind';

import { useEmojiCounts } from '@hooks/common';

import EmojiItem from './EmojiItem';
import styles from './EmojiList.module.scss';

const cx = classNames.bind(styles);

export interface EmojiListProps {
  gridColumns?: 3 | 4;
  recipientId: number;
  displayLimit?: number;
}

/**
 * 이모지 리스트 컴포넌트
 * 롤링페이퍼에 추가된 이모지들을 보여줍니다.
 */
export default function EmojiList({ gridColumns = 3, recipientId, displayLimit = 30 }: EmojiListProps) {
  const { emojiList, isEmpty } = useEmojiCounts(recipientId, displayLimit);

  return isEmpty ? (
    <div className={cx('emoji-list-empty')}>
      <p>상대에게 이모티콘을 남겨보세요🩷</p>
    </div>
  ) : (
    <ul className={cx('emoji-list')} style={{ '--columns': gridColumns } as React.CSSProperties}>
      {emojiList.map(([emoji, count]) => (
        <EmojiItem key={emoji} emoji={emoji} count={count} recipientId={recipientId} />
      ))}
    </ul>
  );
}
