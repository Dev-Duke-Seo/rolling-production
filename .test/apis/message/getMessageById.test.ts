import { getMessageById } from '@apis/message/getMessageById';

if (!process.env.RECIPIENT_TEST_ID || !process.env.MESSAGE_TEST_ID) {
  throw new Error('RECIPIENT_TEST_ID와 MESSAGE_TEST_ID 환경변수가 필요합니다');
}

const TEST_MESSAGE_ID = Number(process.env.MESSAGE_TEST_ID);

describe('getMessageById', () => {
  it('메시지를 ID로 조회할 수 있다', async () => {
    const response = await getMessageById({
      messageId: TEST_MESSAGE_ID,
    });

    expect(response).toMatchObject({
      id: TEST_MESSAGE_ID,
      content: expect.any(String),
    });
  });
});