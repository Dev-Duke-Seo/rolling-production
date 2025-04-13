import { instanceWithTeamId as instance } from '@apis/axios';

interface DeleteMessageByIdParams {
  messageId: number;
}

export const deleteMessageById = async ({ messageId }: DeleteMessageByIdParams): Promise<number> => {
  const response = await instance.delete(`/messages/${messageId}/`);

  if (response.status !== 204) {
    throw new Error('메시지 삭제에 실패했습니다');
  }

  return response.status;
};
