'use client';

/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import data from '@emoji-mart/data';
import EmojiPicker from '@emoji-mart/react';

import { EmojiIcon, EmojiId } from '@apis/types/Reaction';
import { fromEmojiIconToEmojiString } from '@apis/utils/emojiUtils';
import { useMutationReaction } from '@queries/useReactionQueries';
import { useEmojiStore } from '@stores/useEmojiStore';

interface EmojiServiceProps {
  recipientId: number;
}

export default function EmojiService({ recipientId }: EmojiServiceProps) {
  const { hasLocalEmoji: hasEmoji, addLocalEmoji: addEmoji } = useEmojiStore();
  const { mutate } = useMutationReaction(recipientId);

  // 기본 동작: 서버에 이모지 증가 요청
  const handleEmojiSelect = (emojiObject: { id: EmojiId; native: EmojiIcon }) => {
    const emojiString = fromEmojiIconToEmojiString(emojiObject.native);

    if (!hasEmoji(recipientId, emojiObject.native)) {
      addEmoji(recipientId, emojiObject.native);
      mutate({ type: 'increase', emoji: emojiString! });
    }
  };

  return <EmojiPicker data={data} locale='ko' theme='light' onEmojiSelect={handleEmojiSelect} />;
}
