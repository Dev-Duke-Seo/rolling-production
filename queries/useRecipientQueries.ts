import { useInfiniteQuery, useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { deleteRecipient } from '@apis/recipients/deletePost';
import { getRecipients, GetRecipientsParams } from '@apis/recipients/getRecipients';
import { getRecipientsById } from '@apis/recipients/getRecipientsById';

import { queries } from './keys/apiQueryKeys';
import { getQueryClient } from './QueryProvider';

export function useRecipientsList(params: GetRecipientsParams) {
  return useSuspenseQuery({
    ...queries.recipients.list(params),
    queryFn: async () => {
      const response = await getRecipients(params);

      return response;
    },
  });
}

export function useRecipientsListInfinite(
  params: GetRecipientsParams = { limit: 8 },
  options: { enabled?: boolean } = {},
) {
  return useInfiniteQuery({
    ...queries.recipients.all,
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getRecipients({
        ...params,
        offset: pageParam,
      });

      return response;
    },

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;

      try {
        // eslint-disable-next-line compat/compat
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get('offset');

        return nextOffset ? parseInt(nextOffset, 10) : undefined;
      } catch {
        // URL 파싱 실패 시 기존 방식 사용
        return (lastPage.results.length || 0) + (params.offset || 0);
      }
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
      queryClient.invalidateQueries({ ...queries.recipients.list() });
    },
  });
}
