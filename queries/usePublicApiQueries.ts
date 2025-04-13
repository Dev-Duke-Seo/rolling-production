import { useSuspenseQuery } from '@tanstack/react-query';

import { getBackgroundImages } from '@apis/public/backgroundImages';
import { getProfileImages } from '@apis/public/profileImages';
import { queries } from '@queries/keys/apiQueryKeys';

export const useBackgroundImages = () => {
  return useSuspenseQuery({
    ...queries.publicApi.backgroundImages,
    queryFn: async () => {
      const response = await getBackgroundImages();

      return response;
    },
  });
};

export const useProfileImages = () => {
  return useSuspenseQuery({
    ...queries.publicApi.profileImages,
    queryFn: async () => {
      const response = await getProfileImages();


      return [...response.imageUrls];
    },
    staleTime: 10000,
  });
};
