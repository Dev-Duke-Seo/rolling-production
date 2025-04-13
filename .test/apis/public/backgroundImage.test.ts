import { getBackgroundImages } from '@apis/public/backgroundImages';

describe('Background Image Integration Tests', () => {
  it('실제 API 호출 테스트', async () => {
    try {
      const urls = await getBackgroundImages();

      expect(Array.isArray(urls)).toBeTruthy();
      expect(urls.every((url) => typeof url === 'string')).toBeTruthy();
    } catch (error) {
      console.error('API 에러:', error);
      throw error;
    }
  }, 10000);
});
