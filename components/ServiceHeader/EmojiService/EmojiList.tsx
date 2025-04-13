'use client';

import React from 'react';

import classNames from 'classnames/bind';

import { EmojiIcon, Reaction } from '@apis/types/Reaction';
import { isEmoji, isEmojiString, toEmojiIcon } from '@apis/utils/emojiUtils';
import { useReactionList } from '@queries/useReactionQueries';

import EmojiItem from './EmojiItem';
import styles from './EmojiList.module.scss';

const cx = classNames.bind(styles);

export interface EmojiListProps {
  gridColumns?: 3 | 4;
  recipientId: number;
  limit?: number;
}

export default function EmojiList({ gridColumns = 3, recipientId, limit = 30 }: EmojiListProps) {
  const { data } = useReactionList(recipientId, { limit });

  // 데이터를 모두 EmojiIcon으로 변환하고 집계
  const emojiList = React.useMemo((): [EmojiIcon, number][] => {
    if (!data?.results) return [];

    // 이모지와 카운트를 집계할 객체
    const aggregatedMap: Map<EmojiIcon, number> = new Map();

    // 각 반응을 순회하며 이모지를 변환하고 집계
    data.results?.forEach((reaction: Reaction) => {
      const { emoji, count } = reaction;

      if (!(isEmojiString(emoji) || isEmoji(emoji))) return;

      const emojiIcon = toEmojiIcon(emoji);

      if (emojiIcon) {
        const oldCount = aggregatedMap.get(emojiIcon) || 0;
        aggregatedMap.set(emojiIcon, oldCount + count);
      }
    });

    // Map을 [emoji, count] 형태의 배열로 변환
    return Array.from(aggregatedMap.entries())
      .sort((a, b) => b[1] - a[1])
      .filter(([_, count]) => count > 0);
  }, [data]);

  return emojiList.length > 0 ? (
    <ul className={cx('emoji-list')} style={{ '--columns': gridColumns } as React.CSSProperties}>
      {emojiList.map(([emoji, count]) => (
        <EmojiItem key={emoji} emoji={emoji} count={count} recipientId={recipientId} />
      ))}
    </ul>
  ) : (
    <div className={cx('emoji-list-empty')}>
      <p>상대에게 이모티콘을 남겨보세요🩷</p>
    </div>
  );
}
