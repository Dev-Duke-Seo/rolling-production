import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { deleteMessageById } from '@apis/message/deleteMessageById';
import { getMessages } from '@apis/message/getMessages';
import { postMessage } from '@apis/message/postMessage';
import { PostMessageRequest } from '@apis/types/Message';

import { queries } from './keys/apiQueryKeys';
import { getQueryClient } from './QueryProvider';

export const useInfiniteMessages = (recipientId: number, firstPageLimit = 5, nextPagesLimit = 3) => {
  return useInfiniteQuery({
    queryKey: ['infiniteMessages', recipientId, firstPageLimit, nextPagesLimit],
    queryFn: async ({ pageParam = 0 }) => {
      const currentLimit = pageParam === 0 ? firstPageLimit : nextPagesLimit;

      const response = await getMessages({
        recipientId,
        limit: currentLimit,
        offset: pageParam as number,
      });

      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      let nextOffset = 0;

      if (allPages.length === 1) {
        nextOffset = firstPageLimit;
      } else {
        nextOffset = firstPageLimit + (allPages.length - 1) * nextPagesLimit;
      }

      const currentLimit = allPages.length === 1 ? firstPageLimit : nextPagesLimit;

      return lastPage.results.length === currentLimit ? nextOffset : undefined;
    },
  });
};

export const useMutationMessage = (recipientId: number) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (params: PostMessageRequest) => {
      const response = await postMessage(params);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ ...queries.recipients.all });
      // queryClient.invalidateQueries({ ...queries.message.list(recipientId) });
      queryClient.invalidateQueries({ queryKey: ['infiniteMessages', recipientId] });
    },
  });
};

export const useDeleteMessage = (cardId: number) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await deleteMessageById({ messageId: cardId });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message'] });
      queryClient.invalidateQueries({ queryKey: ['infiniteMessages'] });
    },
  });
};
