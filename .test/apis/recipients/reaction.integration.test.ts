import { getReaction } from '@apis/reactions/getReaction';
import { postReaction, toEmojiString } from '@apis/reactions/postReaction';

if (!process.env.RECIPIENT_TEST_ID) {
  throw new Error('RECIPIENT_TEST_ID 환경변수가 필요합니다');
}

const TEST_ID = Number(process.env.RECIPIENT_TEST_ID);

describe('Reaction Integration', () => {
  it('리액션을 생성하고 조회할 수 있다', async () => {
    const emoji = toEmojiString('👍');

    // 1. 초기값 조회
    const initialResponse = await getReaction({ recipientId: TEST_ID });
    const initialCount = initialResponse.results.find((r) => toEmojiString(r.emoji) === emoji)?.count ?? 0;

    // 2. 새로운 리액션 추가
    const postResponse = await postReaction({
      recipientId: TEST_ID,
      type: 'increase',
      emoji,
    });

    // 3. 응답 검증 (초기값 + 1)
    expect(postResponse).toMatchObject({
      id: expect.any(Number),
      recipient_id: TEST_ID,
      emoji: '👍',
      count: initialCount + 1,
    });

    // 4. 변경된 값 확인
    const getResponse = await getReaction({ recipientId: TEST_ID });
    expect(getResponse.results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          emoji: '👍',
          count: initialCount + 1,
        }),
      ]),
    );
  });
});
