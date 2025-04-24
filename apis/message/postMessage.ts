import { instance } from '@apis/axios';
import { Message, PostMessageRequest } from '@apis/types/Message';

export const postMessage = async ({ recipientId, ...data }: PostMessageRequest): Promise<Message> => {
  try {
    const response = await instance.post<Message>(`/recipients/${recipientId}/messages/`, data);

    return response.data;
  } catch (error) {
    console.error('Failed to post message:', error);
    throw error;
  }
};
