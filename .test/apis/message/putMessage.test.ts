import { getMessageById } from '@apis/message/getMessageById';
import { putMessage } from '@apis/message/putMessage';
import { UrlString } from '@apis/types/Recipient';

if (!process.env.RECIPIENT_TEST_ID || !process.env.MESSAGE_TEST_ID) {
  throw new Error('RECIPIENT_TEST_ID와 MESSAGE_TEST_ID 환경변수가 필요합니다');
}

const TEST_RECIPIENT_ID = Number(process.env.RECIPIENT_TEST_ID);
const TEST_MESSAGE_ID = Number(process.env.MESSAGE_TEST_ID);

describe('putMessage', () => {
  it('메시지를 수정할 수 있다', async () => {
    // 1. 초기값 조회
    const initialMessage = await getMessageById({
      messageId: TEST_MESSAGE_ID,
    });


    // 2. 메시지 수정
    const updatedContent = `Updated message at ${Date.now()} by test`;
    const putResponse = await putMessage({
      messageId: TEST_MESSAGE_ID,
      recipientId: TEST_RECIPIENT_ID,
      sender: 'updated sender',
      content: updatedContent,
      font: initialMessage.font,
      relationship: initialMessage.relationship,
      profileImageURL: 'http://updatedURL.com',
    });
    // 3. 수정된 응답 검증
    expect(putResponse).toMatchObject({
      id: TEST_MESSAGE_ID,
      recipientId: TEST_RECIPIENT_ID,
      content: updatedContent,
      createdAt: initialMessage.createdAt, // 생성일은 변경되면 안됨
    });

    // 4. 실제로 수정되었는지 재조회해서 확인
    const updatedMessage = await getMessageById({
      messageId: TEST_MESSAGE_ID,
    });

    expect(updatedMessage).toMatchObject({
      id: TEST_MESSAGE_ID,
      recipientId: TEST_RECIPIENT_ID,
      content: updatedContent,
    });
  });

  it('존재하지 않는 메시지 수정시 404 에러가 발생한다', async () => {
    await expect(
      putMessage({
        messageId: -1,
        recipientId: TEST_RECIPIENT_ID,
        content: 'test',
        font: 'Noto Sans',
        sender: 'test',
        relationship: '지인',
        profileImageURL: 'http://test.com',
      }),
    ).rejects.toMatchObject({
      response: {
        status: 404,
      },
    });
  });
});
