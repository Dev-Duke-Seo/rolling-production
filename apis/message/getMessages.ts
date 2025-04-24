import { instance } from '@apis/axios';
import { Message } from '@apis/types/Message';

export interface GetMessagesParams {
  recipientId: number;
  limit?: number;
  offset?: number;
}

interface GetMessagesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Message[];
}

export const getMessages = async ({
  recipientId,
  limit = 8,
  offset = 0,
}: GetMessagesParams): Promise<GetMessagesResponse> => {
  const response = await instance.get<GetMessagesResponse>(`/recipients/${recipientId}/messages/`, {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};
