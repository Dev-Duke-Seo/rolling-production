import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { deleteMessageById } from '@apis/message/deleteMessageById';
import { getMessages } from '@apis/message/getMessages';
import { postMessage } from '@apis/message/postMessage';
import { PostMessageRequest } from '@apis/types/Message';

import { queries } from './keys/apiQueryKeys';
import { getQueryClient } from './QueryProvider';

export const useInfiniteMessages = (recipientId: number, firstPageLimit = 5) => {
  return useInfiniteQuery({
    queryKey: [...queries.message.list({ recipientId, limit: firstPageLimit, offset: 0 }).queryKey],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getMessages({
        recipientId,
        limit: firstPageLimit,
        offset: pageParam,
      });

      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;

      // 현재까지 로드된 항목 수 계산
      const totalFetched = allPages.reduce((acc, page) => acc + page.results.length, 0);

      // 다음 offset은 지금까지 불러온 항목 수
      return totalFetched;
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
      queryClient.invalidateQueries({ ...queries.message.list({ recipientId }) });
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
