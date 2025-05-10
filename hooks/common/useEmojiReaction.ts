import { useCallback } from 'react';

import { EmojiIcon, EmojiId } from '@apis/types/Reaction';
import { fromEmojiIconToEmojiString } from '@apis/utils/emojiUtils';
import { useMutationReaction } from '@queries/useReactionQueries';
import { useEmojiStore } from '@stores/useEmojiStore';

/**
 * 이모지 반응 관련 로직을 처리하는 훅
 * @param recipientId 롤링페이퍼 ID
 * @returns 이모지 관련 액션 및 상태
 */
export const useEmojiReaction = (recipientId: number) => {
  const { hasLocalEmoji, addLocalEmoji, removeLocalEmoji } = useEmojiStore();

  const { mutate } = useMutationReaction(recipientId);

  // 이모지 선택 핸들러 (EmojiPicker에서 사용)
  const handleEmojiSelect = useCallback(
    (emojiObject: { id: EmojiId; native: EmojiIcon }) => {
      const emojiString = fromEmojiIconToEmojiString(emojiObject.native);

      if (!hasLocalEmoji(recipientId, emojiObject.native) && emojiString) {
        addLocalEmoji(recipientId, emojiObject.native);
        mutate({ type: 'increase', emoji: emojiString });
      }
    },
    [recipientId, hasLocalEmoji, addLocalEmoji, mutate],
  );

  // 이모지 토글 핸들러 (EmojiItem에서 사용)
  const toggleEmojiReaction = useCallback(
    (emoji: EmojiIcon) => {
      const emojiString = fromEmojiIconToEmojiString(emoji);

      if (!emojiString) return;

      const isSelected = hasLocalEmoji(recipientId, emoji);

      if (!isSelected) {
        addLocalEmoji(recipientId, emoji);
        mutate({ type: 'increase', emoji: emojiString });
      } else {
        removeLocalEmoji(recipientId, emoji);
        mutate({ type: 'decrease', emoji: emojiString });
      }
    },
    [recipientId, hasLocalEmoji, addLocalEmoji, removeLocalEmoji, mutate],
  );

  // 이모지가 선택되었는지 확인하는 함수
  const isEmojiSelected = useCallback(
    (emoji: EmojiIcon) => {
      return hasLocalEmoji(recipientId, emoji);
    },
    [recipientId, hasLocalEmoji],
  );

  return {
    handleEmojiSelect,
    toggleEmojiReaction,
    isEmojiSelected,
  };
};
