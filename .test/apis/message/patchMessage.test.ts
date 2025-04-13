import { getMessageById } from '@apis/message/getMessageById';
import { patchMessage } from '@apis/message/patchMessage';
import { postMessage } from '@apis/message/postMessage';

if (!process.env.RECIPIENT_TEST_ID) {
  throw new Error('RECIPIENT_TEST_ID와 MESSAGE_TEST_ID 환경변수가 필요합니다');
}

const TEST_RECIPIENT_ID = Number(process.env.RECIPIENT_TEST_ID);

describe('patchMessage', () => {
  let TEST_MESSAGE_ID: number;

  beforeEach(async () => {
    const message = await postMessage({
      recipientId: TEST_RECIPIENT_ID,
      profileImageURL: 'https://example.com/profile.jpg',
      content: 'Test message for post',
      sender: 'test sender',
      relationship: '지인',
      font: 'Noto Sans',
    });
    TEST_MESSAGE_ID = message.id;
  });

  it('메시지의 일부 필드를 수정할 수 있다', async () => {
    // 1. 초기값 조회
    const initialMessage = await getMessageById({
      messageId: TEST_MESSAGE_ID,
    });

    // 2. content만 수정
    const updatedContent = `Patched message at ${Date.now()} by test`;
    const patchResponse = await patchMessage({
      messageId: TEST_MESSAGE_ID,
      recipientId: TEST_RECIPIENT_ID,
      content: updatedContent,
    });

    // 3. 수정된 응답 검증 (content만 변경되고 나머지는 유지)
    expect(patchResponse).toMatchObject({
      id: TEST_MESSAGE_ID,
      content: updatedContent,
      font: initialMessage.font,
      relationship: initialMessage.relationship,
      sender: initialMessage.sender,
      profileImageURL: initialMessage.profileImageURL,
      createdAt: initialMessage.createdAt,
    });

    // 4. 실제로 수정되었는지 재조회해서 확인
    const updatedMessage = await getMessageById({
      messageId: TEST_MESSAGE_ID,
    });

    expect(updatedMessage).toMatchObject({
      id: TEST_MESSAGE_ID,
      content: updatedContent,
    });
  });

  it('여러 필드를 동시에 수정할 수 있다', async () => {
    const patchResponse = await patchMessage({
      messageId: TEST_MESSAGE_ID,
      recipientId: TEST_RECIPIENT_ID,
      content: 'Multiple fields update',
      sender: 'new sender',
      relationship: '지인',
    });

    expect(patchResponse).toMatchObject({
      content: 'Multiple fields update',
      sender: 'new sender',
      relationship: '지인',
    });
  });

  it('존재하지 않는 메시지 수정시 404 에러가 발생한다', async () => {
    await expect(
      patchMessage({
        messageId: -1,
        recipientId: TEST_RECIPIENT_ID,
        content: 'test',
      }),
    ).rejects.toMatchObject({
      response: {
        status: 404,
      },
    });
  });
});
