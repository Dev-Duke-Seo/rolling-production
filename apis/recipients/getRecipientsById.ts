import { AxiosResponse } from 'axios';

import { instance } from '@apis/axios';
import { Recipient } from '@apis/types/Recipient';

type GetRecipientsByIdResponse = Recipient;

export const getRecipientsById = async (recipientId: number): Promise<GetRecipientsByIdResponse> => {
  const { data }: AxiosResponse<GetRecipientsByIdResponse> = await instance.get(`/recipients/${recipientId}/`);

  return data;
};
