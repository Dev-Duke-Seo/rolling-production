import { getMessageById } from '@apis/message/getMessageById';
import { deleteMessageById } from '@apis/message/deleteMessageById';
import { postMessage } from '@apis/message/postMessage';

if (!process.env.RECIPIENT_TEST_ID) {
  throw new Error('RECIPIENT_TEST_ID 환경변수가 필요합니다');
}

const TEST_RECIPIENT_ID = Number(process.env.RECIPIENT_TEST_ID);

describe('deleteMessageById', () => {
  it('메시지를 삭제할 수 있다', async () => {
    let TEST_MESSAGE_ID: number;

    // 테스트용 메시지 생성
    const message = await postMessage({
      recipientId: TEST_RECIPIENT_ID,
      profileImageURL: 'https://example.com/profile.jpg',
      content: 'Test message for deletion',
      sender: 'test sender',
      relationship: '지인',
      font: 'Noto Sans',
      backgroundColor: 'beige',
    });
    TEST_MESSAGE_ID = message.id;

    // 1. 삭제 실행
    await deleteMessageById({
      messageId: TEST_MESSAGE_ID,
    });

    // 2. 삭제된 메시지 조회시 404 에러 발생 확인
    await expect(
      getMessageById({
        messageId: TEST_MESSAGE_ID,
      }),
    ).rejects.toMatchObject({
      response: {
        status: 404,
      },
    });
  });
});
