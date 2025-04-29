import { instance } from '@apis/axios';
import { Recipient } from '@apis/types/Recipient';

export interface GetRecipientsParams {
  limit?: number;
  offset?: number;
  sort?: 'popular' | 'recent';
}

export interface GetRecipientsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Recipient[];
}

export const getRecipients = async ({ limit = 8, offset = 0, sort = 'popular' }: GetRecipientsParams = {}) => {
  const response = await instance.get<GetRecipientsResponse>('/recipients/', {
    params: {
      limit,
      offset,
      sort,
    },
  });

  return response.data;
};
