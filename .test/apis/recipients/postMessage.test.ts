import { postMessage } from '@apis/message/postMessage';

if (!process.env.NEXT_PUBLIC_TEAM_ID) {
  throw new Error('NEXT_PUBLIC_TEAM_ID 환경변수가 필요합니다');
}

const TEST_ID = Number(process.env.RECIPIENT_TEST_ID);

describe('postMessage', () => {
  it('롤링페이퍼 메시지를 생성한다', async () => {
    const response = await postMessage({
      recipientId: TEST_ID,
      sender: 'test',
      relationship: '지인',
      content: 'test',
      font: 'Noto Sans',
      profileImageURL: 'http://test.com',
    });

    expect(response).toMatchObject({
      id: expect.any(Number),
      recipientId: TEST_ID,
      sender: expect.any(String),
      profileImageURL: expect.any(String) || null,
      relationship: expect.any(String),
      content: expect.any(String),
      font: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('잘못된 ID로 요청시 404 에러를 반환한다', async () =>
    await expect(
      postMessage({
        recipientId: -1,
        sender: 'test',
        relationship: '지인',
        content: 'test',
        font: 'Noto Sans',
        profileImageURL: null,
      }),
    ).rejects.toThrow('Request failed with status code 404'));
});
