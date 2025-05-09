import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { EmojiIcon } from '@apis/types/Reaction';

interface UserEmoji {
  userId: number;
  emoji: EmojiIcon;
}

interface EmojiStore {
  // 사용자별 이모지 목록
  userEmojis: UserEmoji[];

  // 이모지 추가 (특정 사용자에게 이모지 보내기)
  addLocalEmoji: (userId: number, emoji: EmojiIcon) => void;

  // 이모지 제거 (특정 사용자에게 보낸 이모지 취소)
  removeLocalEmoji: (userId: number, emoji: EmojiIcon) => void;

  // 특정 사용자에게 특정 이모지를 보냈는지 확인
  hasLocalEmoji: (userId: number, emoji: EmojiIcon) => boolean;

  // 모든 상태 초기화
  reset: () => void;
}

// 초기 상태
const initialState = {
  userEmojis: [],
};

// 이모지 일치 여부 확인 함수 분리
const isMatchingEmoji = (item: UserEmoji, userId: number, emoji: EmojiIcon) =>
  item.userId === userId && item.emoji === emoji;

export const useEmojiStore = create<EmojiStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addLocalEmoji: (userId: number, emoji: EmojiIcon) => {
        set((state) => ({
          userEmojis: [...state.userEmojis, { userId, emoji }],
        }));
      },

      removeLocalEmoji: (userId: number, emoji: EmojiIcon) => {
        set((state) => ({
          userEmojis: state.userEmojis.filter((item) => !isMatchingEmoji(item, userId, emoji)),
        }));
      },

      hasLocalEmoji: (userId: number, emoji: EmojiIcon) => {
        return get().userEmojis.some((item) => isMatchingEmoji(item, userId, emoji));
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'emoji-storage', // 로컬 스토리지에 저장될 키 이름
    },
  ),
);
