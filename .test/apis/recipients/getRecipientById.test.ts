import { getRecipientsById } from '@apis/recipients/getRecipientsById';

describe('getRecipientById', () => {
  const TEST_ID = Number(process.env.RECIPIENT_TEST_ID);

  it('특정 ID로 롤링페이퍼를 조회한다', async () => {
    const response = await getRecipientsById({ recipientId: TEST_ID });
    
    expect(response).toMatchObject({
      id: TEST_ID,
      name: expect.any(String),
      backgroundColor: expect.any(String),
      // backgroundImageURL: expect.anything() || null,
      createdAt: expect.any(String),
      messageCount: expect.any(Number),
      recentMessages: expect.any(Array),
      reactionCount: expect.any(Number),
      topReactions: expect.any(Array)
    });

    if (!response.backgroundImageURL) {
      expect(response.backgroundImageURL).toBeNull();
    } else {
      expect(response.backgroundImageURL).toEqual(expect.any(String));
    }
  });
}); 