import { instanceWithTeamId as instance } from '@apis/axios';
import { Font, Message } from '@apis/types/Message';

import { Relationship } from '@components/Badge';

const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

interface PatchMessageParams {
  messageId: number;
  recipientId: number;
  content?: string;
  font?: Font;
  profileImageURL?: string;
  sender?: string;
  relationship?: Relationship;
}

type PatchMessageResponse = Message;

export const patchMessage = async ({
  messageId,
  recipientId,
  content,
  font,
  profileImageURL,
  sender,
  relationship,
}: PatchMessageParams): Promise<PatchMessageResponse> => {
  const response = await instance.patch<PatchMessageResponse>(`/messages/${messageId}/`, {
    team: TEAM_ID,
    recipientId,
    ...(sender && { sender }),
    ...(profileImageURL && { profileImageURL }),
    ...(relationship && { relationship }),
    ...(content && { content }),
    ...(font && { font }),
  });

  return response.data;
};
