import { ColorchipColors } from '@constants/COLORS';
import { instanceWithTeamId as instance } from '@apis/axios';
import { Recipient, UrlString } from '@apis/types/Recipient';

interface PostRecipientsParams {
  name: string;
  backgroundColor: ColorchipColors | null;
  backgroundImageURL?: UrlString | null;
}

type PostRecipientsResponse = Recipient;

export const postRecipients = async ({
  name,
  backgroundColor = 'beige',
  backgroundImageURL = null,
}: PostRecipientsParams) => {
  const response = await instance.post<PostRecipientsResponse>('/recipients/', {
    name,
    backgroundColor,
    backgroundImageURL,
  });

  return response.data;
};
