import { instance } from '@apis/axios';
import { Font, Message } from '@apis/types/Message';

import { Relationship } from '@components/Badge';

const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

interface PutMessageParams {
  messageId: number;
  recipientId: number;
  content: string;
  font: Font;
  profileImageURL?: string;
  sender: string;
  relationship: Relationship;
}

type PutMessageResponse = Message;

export const putMessage = async ({
  messageId,
  recipientId,
  content,
  font,
  profileImageURL,
  sender,
  relationship,
}: PutMessageParams): Promise<PutMessageResponse> => {
  const response = await instance.put<PutMessageResponse>(`/messages/${messageId}/`, {
    team: TEAM_ID,
    recipientId,
    sender,
    profileImageURL,
    relationship,
    content,
    font,
  });

  return response.data;
};
