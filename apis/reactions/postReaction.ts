import { instance } from '@apis/axios';
import { EmojiString, Reaction } from '@apis/types/Reaction';

export type ReactionType = 'increase' | 'decrease';

type PostReactionParams = {
  emoji: EmojiString;
  type: ReactionType;
  recipientId: number;
};

type PostReactionResponse = Reaction & {
  recipient_id: number;
  id: number;
  count: number;
};

export const postReaction = async ({ recipientId, type, emoji }: PostReactionParams) => {
  const response = await instance.post<PostReactionResponse>(`/recipients/${recipientId}/reactions/`, {
    type,
    emoji,
  });

  return response.data;
};

export type { Reaction };
