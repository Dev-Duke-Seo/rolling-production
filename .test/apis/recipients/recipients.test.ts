import { postRecipients } from '@apis/recipients/postRecipients';
import { getRecipients } from '@apis/recipients/getRecipients';
import { deleteRecipient } from '@apis/recipients/deletePost';

describe('Recipients API 통합 테스트', () => {
  let createdRecipientId: number;

  it('1. POST: 새로운 롤링페이퍼를 생성한다', async () => {
    const testData = {
      name: '통합 테스트 롤링페이퍼',
      backgroundColor: 'beige' as const,
    };

    try {
      const response = await postRecipients(testData);
      createdRecipientId = response.id;

      // 응답 구조 검증
      expect(response).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: testData.name,
          backgroundColor: testData.backgroundColor,
          backgroundImageURL: null,
          messageCount: expect.any(Number),
          recentMessages: expect.any(Array),
          reactionCount: expect.any(Number),
          topReactions: expect.any(Array),
          createdAt: expect.any(String),
        }),
      );
    } catch (error) {
      console.error('API 에러:', error);
      throw error;
    }
  }, 10000);

  it('2. GET: 생성된 롤링페이퍼가 목록에 있는지 확인한다', async () => {
    try {
      const response = await getRecipients({ limit: 8, offset: 0 });

      expect(response).toMatchObject({
        count: expect.any(Number),
        results: expect.any(Array),
      });

      // next와 previous는 별도로 체크
      expect(response.next === null || typeof response.next === 'string').toBe(true);
      expect(response.previous === null || typeof response.previous === 'string').toBe(true);

      // 생성된 롤링페이퍼 찾기
      const createdRecipient = response.results.find((recipient) => recipient.id === createdRecipientId);

      expect(createdRecipient).toBeDefined();
    } catch (error) {
      console.error('API 에러:', error);
      throw error;
    }
  }, 10000);

  it('3. DELETE: 생성된 롤링페이퍼를 삭제한다', async () => {
    try {
      const statusCode = await deleteRecipient(createdRecipientId);
      expect(statusCode).toBe(204);

      // 삭제 후 GET 요청으로 확인
      const response = await getRecipients({ limit: 8, offset: 0 });
      const deletedRecipient = response.results.find((recipient) => recipient.id === createdRecipientId);
      expect(deletedRecipient).toBeUndefined();
    } catch (error) {
      console.error('API 에러:', error);
      throw error;
    }
  }, 10000);
});
