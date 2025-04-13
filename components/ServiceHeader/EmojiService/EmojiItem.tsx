import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { EmojiIcon } from '@apis/types/Reaction';
import { fromEmojiIconToEmojiString, isEmojiIcon } from '@apis/utils/emojiUtils';
import { useMutationReaction } from '@queries/useReactionQueries';
import { useEmojiStore } from '@stores/useEmojiStore';

import styles from './EmojiItem.module.scss';

const cx = classNames.bind(styles);

export interface EmojiItemProps {
  emoji: EmojiIcon;
  count: number;
  recipientId: number;
}

const formatCountToK = (count: number): string => {
  if (count >= 1000) {
    return `${(Math.floor(count / 100) / 10).toFixed(1)}k`;
  }

  return count.toString();
};

// 이모지 ID에서 실제 이모지 문자로 변환하는 함수

export default function EmojiItem({ emoji, count, recipientId }: EmojiItemProps) {
  const storeSelected = useEmojiStore((state) => state.hasLocalEmoji(recipientId, emoji));
  const [isSelected, setIsSelected] = useState(false);
  const { addLocalEmoji, removeLocalEmoji } = useEmojiStore();
  const { mutate } = useMutationReaction(recipientId);

  // 클라이언트 측에서만 실행되는 useEffect
  useEffect(() => {
    setIsSelected(storeSelected);
  }, [storeSelected]);

  const toggleItem = async () => {
    if (!isSelected) {
      addLocalEmoji(recipientId, emoji);
      mutate({ type: 'increase', emoji: fromEmojiIconToEmojiString(emoji)! });
    } else {
      removeLocalEmoji(recipientId, emoji);
      mutate({ type: 'decrease', emoji: fromEmojiIconToEmojiString(emoji)! });
    }
  };

  if (!isEmojiIcon(emoji) || count === 0) {
    return null;
  }

  return (
    <button type='button' className={cx('emoji-item', { selected: isSelected })} onClick={toggleItem}>
      <p className={cx('emoji')}>{emoji}</p>
      <p className={cx('count')}>{formatCountToK(count)}</p>
    </button>
  );
}
