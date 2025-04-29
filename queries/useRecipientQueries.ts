import { useInfiniteQuery, useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { deleteRecipient } from '@apis/recipients/deletePost';
import { getRecipients, GetRecipientsParams } from '@apis/recipients/getRecipients';
import { getRecipientsById } from '@apis/recipients/getRecipientsById';
import { postRecipients, PostRecipientsParams } from '@apis/recipients/postRecipients';

import { queries } from './keys/apiQueryKeys';
import { getQueryClient } from './QueryProvider';

export function useRecipientsListInfinite(
  params: GetRecipientsParams = { limit: 8, sort: 'popular' },
  options: { enabled?: boolean } = {},
) {
  return useInfiniteQuery({
    queryKey: [...queries.recipients.list(params).queryKey],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getRecipients({
        ...params,
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
    enabled: options.enabled,
  });
}

export function useRecipientById(recipientId: number) {
  return useSuspenseQuery({
    ...queries.recipients.byId(recipientId),
    queryFn: async () => {
      const response = await getRecipientsById(recipientId);

      return response;
    },
  });
}

export function useDeleteRecipient(recipientId: number) {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async () => {
      await deleteRecipient(recipientId);
    },
    onSuccess: () => {
      // 모든 sort 옵션에 대한 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['recipients'] });
    },
  });
}

export function usePostRecipient() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (recipient: PostRecipientsParams) => {
      const response = await postRecipients(recipient);

      return response;
    },
    onSuccess: () => {
      // 모든 sort 옵션에 대한 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['recipients'] });
    },
  });
}
