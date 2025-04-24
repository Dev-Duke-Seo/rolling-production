import { EmojiString, postReaction, toEmojiString } from '@apis/reactions/postReaction';
import { instance as instance } from '@apis/axios';

jest.mock('@apis/axios', () => ({
  instanceWithTeamId: {
    post: jest.fn(),
  },
}));

describe('postReaction', () => {
  const mockResponse = {
    data: {
      recipient_id: 123,
      emoji: ':thumbsup:',
      count: 5,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (instance.post as jest.Mock).mockResolvedValue(mockResponse);
  });

  it('이모지 리액션을 성공적으로 전송해야 한다', async () => {
    const params = {
      recipientId: 123,
      type: 'increase' as const,
      emoji: ':thumbsup:' as EmojiString,
    };

    const result = await postReaction(params);

    expect(instance.post).toHaveBeenCalledWith('/recipients/123/reactions/', {
      type: 'increase',
      emoji: ':thumbsup:',
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('API 호출이 실패하면 에러를 던져야 한다', async () => {
    const error = new Error('API Error');
    (instance.post as jest.Mock).mockRejectedValue(error);

    const params = {
      recipientId: 123,
      type: 'decrease' as const,
      emoji: ':thumbsdown:' as EmojiString,
      id: 1,
      count: 0,
    };

    await expect(postReaction(params)).rejects.toThrow('API Error');
  });
});

describe('toEmojiString', () => {
  it('유효한 이모지 ID를 EmojiString으로 변환해야 한다', () => {
    expect(() => toEmojiString(':thumbsup:')).not.toThrow();
    expect(() => toEmojiString(':heart:')).not.toThrow();
    expect(() => toEmojiString(':smile:')).not.toThrow();
  });

  it('유효하지 않은 문자열에 대해 에러를 던져야 한다', () => {
    expect(() => toEmojiString('thumbsup')).toThrow('Invalid emoji string');
    expect(() => toEmojiString('👍')).toThrow('Invalid emoji string');
    expect(() => toEmojiString('abc')).toThrow('Invalid emoji string');
    expect(() => toEmojiString('::abc::')).toThrow('Invalid emoji string');
  });
});
