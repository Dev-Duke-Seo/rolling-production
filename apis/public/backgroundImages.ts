import { instance } from '@apis/axios';

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

export const getBackgroundImages = async (): Promise<string[]> => {
  const response = await instance.get('public/background-images/');

  return response.data.imageUrls;
};
