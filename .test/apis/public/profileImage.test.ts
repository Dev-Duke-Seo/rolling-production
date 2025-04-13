import { getProfileImages } from '@apis/public/profileImages';

describe('Profile Image Integration Tests', () => {
  it('실제 API 호출 테스트', async () => {
    try {
      const response = await getProfileImages();

      expect(Array.isArray(response.imageUrls)).toBeTruthy();
      expect(response.imageUrls.every((url) => typeof url === 'string')).toBeTruthy();
    } catch (error) {
      console.error('API 에러:', error);
      throw error;
    }
  }, 10000);
});