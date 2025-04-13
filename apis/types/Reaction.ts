// Emoji, EmojiString, EmojiId, EmojiIcon

export interface Reaction {
  emoji: Emoji;
  id: number;
  count: number;
}

// 이모지 타입
export type Emoji = EmojiString | EmojiIcon;

// 이모지 문자열 타입 (ex: :smile:)
export type EmojiString = string & { __emojiString: true };

// 이모지 아이콘 타입 (ex: 🤔)
export type EmojiIcon = string & { __emojiIcon: true };

// 이모지 아이디 타입 (ex: smile)
export type EmojiId = string & { __emojiId: true };

// 라이브러리 data 타입 정의
export interface EmojiData {
  emojis: {
    [key: string]: {
      skins: {
        native: string;
        [key: string]: any;
      }[];
      [key: string]: any;
    };
  };
  [key: string]: any;
}

// data를 타입 캐스팅
