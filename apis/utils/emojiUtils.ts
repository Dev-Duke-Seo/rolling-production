import data from '@emoji-mart/data';

import { Emoji, EmojiData, EmojiIcon, EmojiId, EmojiString } from '@apis/types/Reaction';

const typedData = data as EmojiData;

// 이모지 타입인지 확인
export const isEmoji = (character: string): character is Emoji => {
  return isEmojiString(character) || isEmojiIcon(character);
};

// 이모지 문자열인지 확인(ex: :smile:)
export const isEmojiString = (character: string): character is EmojiString => {
  // 정확히 1개의 ':' 로 시작하고 하나 이상의 영숫자 문자가 있고 1개의 ':' 로 끝나는 형식만 허용
  // ::abc:: 같은 형식은 허용하지 않음
  const emojiRegex = /^:[a-zA-Z0-9_]+:$/;

  const isEmojiRegex = emojiRegex.test(character);

  if (!isEmojiRegex) {
    return false;
  }

  const emojiId = character.replaceAll(':', '');

  const isEmojiId = Object.keys(typedData.emojis).find((id) => id === emojiId);

  if (!isEmojiId) {
    return false;
  }

  return true;
};

// data에 있는 이모지 아이콘인지 확인
export const isEmojiIcon = (character: string): character is EmojiIcon => {
  // find 함수로 찾아보기
  const emoji = Object.keys(typedData.emojis).find((key) => typedData.emojis[key].skins[0].native === character);

  return emoji !== undefined;
};

const removeSemicolon = (emoji: EmojiString): string => {
  return emoji.replaceAll(':', '');
};

// EmojiString 타입을 받아서 EmojiId를 반환
export const getEmojiIdFromEmoji = (emoji: Emoji): EmojiId | null => {
  if (isEmojiString(emoji)) {
    return removeSemicolon(emoji) as EmojiId;
  }

  if (isEmojiIcon(emoji)) {
    const emojiString = fromEmojiIconToEmojiString(emoji);

    return emojiString ? (removeSemicolon(emojiString) as EmojiId) : null;
  }

  return null;
};

export const StringToEmojiString = (value: string): EmojiString => {
  if (isEmojiIcon(value)) {
    return fromEmojiIconToEmojiString(value) as EmojiString;
  }

  const emojiId = value.replaceAll(':', '');

  if (!isEmojiString(emojiId) && typedData.emojis[emojiId]) {
    return `:${emojiId}:` as EmojiString;
  }

  return value as EmojiString;
};

export const fromEmojiIconToEmojiString = (emoji: EmojiIcon): EmojiString | null => {
  const emojiId = Object.keys(typedData.emojis).find((key) => typedData.emojis[key].skins[0].native === emoji);

  return emojiId ? StringToEmojiString(emojiId) : null;
};

export const toEmojiIcon = (emoji: Emoji): EmojiIcon | null => {
  if (isEmojiIcon(emoji)) {
    return emoji;
  }

  if (isEmojiString(emoji)) {
    const emojiId = getEmojiIdFromEmoji(emoji);

    if (!emojiId) {
      return null;
    }

    return typedData.emojis[emojiId].skins[0].native as EmojiIcon;
  }

  return null;
};
