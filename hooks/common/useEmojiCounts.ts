import { useMemo } from 'react';

import { EmojiIcon, Reaction } from '@apis/types/Reaction';
import { isEmoji, isEmojiString, toEmojiIcon } from '@apis/utils/emojiUtils';
import { useReactionList } from '@queries/useReactionQueries';

/**
 * 이모지 데이터를 가져오고 집계하는 훅
 * @param recipientId 롤링페이퍼 ID
 * @param displayLimit 최대 표시할 이모지 개수
 * @returns 이모지와 개수 배열 [emoji, count][]
 */
export const useEmojiCounts = (recipientId: number, displayLimit: number = 30) => {
  const { data } = useReactionList(recipientId);

  // 데이터를 모두 EmojiIcon으로 변환하고 집계
  const emojiList = useMemo((): [EmojiIcon, number][] => {
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
      .filter(([_, count]) => count > 0)
      .slice(0, displayLimit);
  }, [data, displayLimit]);

  return {
    emojiList,
    isEmpty: emojiList.length === 0,
  };
}; 