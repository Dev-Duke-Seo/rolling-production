import { instanceWithTeamId as instance } from '@apis/axios';
import { Message } from '@apis/types/Message';

interface GetMessageByIdParams {
  messageId: number;
}

type GetMessageByIdResponse = Message;

export const getMessageById = async ({ messageId }: GetMessageByIdParams): Promise<GetMessageByIdResponse> => {
  const response = await instance.get<GetMessageByIdResponse>(`/messages/${messageId}/`);

  return response.data;
};
