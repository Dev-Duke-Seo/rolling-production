'use client';

/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import data from '@emoji-mart/data';
import EmojiPicker from '@emoji-mart/react';

import { useEmojiReaction } from '@hooks/common';

interface EmojiServiceProps {
  recipientId: number;
}

/**
 * 이모지 서비스 컴포넌트
 * 이모지 선택기를 렌더링하고 이모지 선택 시 서버에 반응을 전송합니다.
 */
export default function EmojiService({ recipientId }: EmojiServiceProps) {
  const { handleEmojiSelect } = useEmojiReaction(recipientId);

  return <EmojiPicker data={data} locale='ko' theme='light' onEmojiSelect={handleEmojiSelect} />;
}
