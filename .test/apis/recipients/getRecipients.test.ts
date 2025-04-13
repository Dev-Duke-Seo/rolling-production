import { getRecipients } from '@apis/recipients/getRecipients';

describe('Recipients API 테스트', () => {
  it('롤링페이퍼 목록을 가져온다', async () => {
    try {
      const response = await getRecipients({});

      // 응답 구조 검증
      expect(response).toHaveProperty('count');
      expect(response).toHaveProperty('results');
      expect(Array.isArray(response.results)).toBeTruthy();

      if (response.results.length > 0) {
        const recipient = response.results[0];
        expect(recipient).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
          backgroundColor: expect.any(String),
          messageCount: expect.any(Number),
          reactionCount: expect.any(Number),
          recentMessages: expect.any(Array),
          topReactions: expect.any(Array),
          createdAt: expect.any(String)
        });
      }
    } catch (error) {
      console.error('API 에러:', error);
      throw error;
    }
  }, 10000);

  it('limit과 offset으로 페이지네이션이 작동한다', async () => {
    try {
      const limit = 2;
      const response = await getRecipients({ limit, offset: 0 });
      
      expect(response.results.length).toBeLessThanOrEqual(limit);
    } catch (error) {
      console.error('API 에러:', error);
      throw error;
    }
  }, 10000);
});
