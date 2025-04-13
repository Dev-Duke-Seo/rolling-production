import { getMessages } from '@apis/message/getMessages';

if (!process.env.RECIPIENT_TEST_ID) {
  throw new Error('Recipient ID 환경변수가 필요합니다');
}

const TEST_ID = Number(process.env.RECIPIENT_TEST_ID);

describe('getMessages', () => {
  it('특정 롤링페이퍼의 메시지 목록을 조회한다', async () => {
    const response = await getMessages({ recipientId: TEST_ID });

    expect(response).toMatchObject({
      count: expect.any(Number),
    //   next: expect.any(String),
    //   previous: expect.anything(s),
      results: expect.any(Array),
    });

    // 기본값 체크 (limit=8)
    expect(response.results.length).toBeLessThanOrEqual(8);

    // results 배열의 각 메시지 형식 체크
    response.results.forEach(message => {
      expect(message).toMatchObject({
        id: expect.any(Number),
        recipientId: TEST_ID,
        content: expect.any(String),
        sender: expect.any(String),
        createdAt: expect.any(String),
      });
    });
  });

  it('limit과 offset으로 페이지네이션이 동작한다', async () => {
    const limit = 5;
    const offset = 0;
    
    const response = await getMessages({ 
      recipientId: TEST_ID,
      limit,
      offset
    });

    expect(response.results.length).toBeLessThanOrEqual(limit);
  });

  it('잘못된 ID로 요청시 404 에러를 반환한다', async () => {
    await expect(
      getMessages({ recipientId: 1 })
    ).rejects.toThrow('Request failed with status code 404');
  });
}); 