import { postRecipients } from '@apis/recipients/postRecipients';

describe('Recipients POST API 테스트', () => {
  it('새로운 롤링페이퍼를 생성한다', async () => {
    const testData = {
      name: '테스트 롤링페이퍼',
      backgroundColor: 'beige' as const,
    };

    try {
      const response = await postRecipients(testData);
      
      expect(response).toBeDefined();
      expect(response.id).toBeDefined();
      expect(response.name).toBe(testData.name);
      expect(response.backgroundColor).toBe(testData.backgroundColor);
      expect(response.messageCount).toBeDefined();
    } catch (error) {
      console.error('API 에러:', error);
      throw error;
    }
  }, 10000);

  it('backgroundImageUrl이 있는 롤링페이퍼를 생성한다', async () => {
    const testData = {
      name: '이미지 테스트',
      backgroundColor: 'purple' as const,
      backgroundImageURL: 'https://example.com/test.jpg' as const
    };

    try {
      const response = await postRecipients(testData);
      
      expect(response).toBeDefined();
      expect(response.id).toBeDefined();
      expect(response.name).toBe(testData.name);
      expect(response.backgroundColor).toBe(testData.backgroundColor);
      expect(response.backgroundImageURL).toBe(testData.backgroundImageURL);
    } catch (error) {
      console.error('API 에러:', error);
      throw error;
    }
  }, 10000);
}); 