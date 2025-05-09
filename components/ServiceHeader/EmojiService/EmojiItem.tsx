import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { EmojiIcon } from '@apis/types/Reaction';
import { isEmojiIcon } from '@apis/utils/emojiUtils';

import { useEmojiReaction } from '@hooks/common';

import styles from './EmojiItem.module.scss';

const cx = classNames.bind(styles);

export interface EmojiItemProps {
  emoji: EmojiIcon;
  count: number;
  recipientId: number;
}

/**
 * 숫자를 K 단위로 포맷팅하는 유틸 함수
 */
const formatCountToK = (count: number): string => {
  if (count >= 1000) {
    return `${(Math.floor(count / 100) / 10).toFixed(1)}k`;
  }

  return count.toString();
};

/**
 * 이모지 아이템 컴포넌트
 * 개별 이모지와 카운트를 표시하고 클릭 시 반응을 토글합니다.
 */
export default function EmojiItem({ emoji, count, recipientId }: EmojiItemProps) {
  const { isEmojiSelected, toggleEmojiReaction } = useEmojiReaction(recipientId);
  const [isSelected, setIsSelected] = useState(false);

  // 클라이언트 측에서만 실행되는 useEffect
  useEffect(() => {
    setIsSelected(isEmojiSelected(emoji));
  }, [emoji, isEmojiSelected]);

  const handleClick = () => {
    toggleEmojiReaction(emoji);
  };

  if (!isEmojiIcon(emoji) || count === 0) {
    return null;
  }

  return (
    <button type='button' className={cx('emoji-item', { selected: isSelected })} onClick={handleClick}>
      <p className={cx('emoji')}>{emoji}</p>
      <p className={cx('count')}>{formatCountToK(count)}</p>
    </button>
  );
}
