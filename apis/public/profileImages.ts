import { instance } from '@apis/axios';
import { UrlString } from '@apis/types/Recipient';

//	Response body
// {
//   "imageUrls": [
//     "https://picsum.photos/id/683/3840/2160",
//     "https://picsum.photos/id/24/3840/2160",
//     "https://picsum.photos/id/599/3840/2160",
//     "https://picsum.photos/id/1058/3840/2160"
//   ]
// }

/**
 * 배경 이미지 URL을 가져옵니다.
 */

interface ProfileImagesResponse {
  imageUrls: UrlString[];
}

export const getProfileImages = async (): Promise<ProfileImagesResponse> => {
  const response = await instance.get<ProfileImagesResponse>('public/profile-images/');

  return response.data;
};
