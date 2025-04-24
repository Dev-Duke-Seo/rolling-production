import { instance } from '@apis/axios';
import { Reaction } from '@apis/types/Reaction';

interface GetReactionParams {
  recipientId: number;
  limit?: number;
  offset?: number;
}

type GetReactionResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Reaction[];
};

export const getReaction = async ({ recipientId, limit = 30, offset = 0 }: GetReactionParams) => {
  const response = await instance.get<GetReactionResponse>(`/recipients/${recipientId}/reactions/`, {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};
