import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { getReaction } from '@apis/reactions/getReaction';
import { postReaction, ReactionType } from '@apis/reactions/postReaction';
import { EmojiString } from '@apis/types/Reaction';

import { queries } from './keys/apiQueryKeys';
import { getQueryClient } from './QueryProvider';

export const useReactionList = (recipientId: number, params: { limit?: number; offset?: number } = {}) => {
  return useSuspenseQuery({
    ...queries.reactions.byId([recipientId, params]),
    queryFn: async () => {
      const response = await getReaction({ recipientId, ...params });

      return response;
    },
  });
};

export const useMutationReaction = (recipientId: number, params: { limit?: number; offset?: number } = {}) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async ({ type, emoji }: { type: ReactionType; emoji: EmojiString }) => {
      const response = await postReaction({ recipientId, type, emoji });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ ...queries.reactions.byId([recipientId, params]) });
    },
  });
};
