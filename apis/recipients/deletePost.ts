import { instanceWithTeamId as instance } from '@apis/axios';

export const deleteRecipient = async (recipientId: number) => {
  const response = await instance.delete(`/recipients/${recipientId}/`);

  return response.status; // should be 204
};
