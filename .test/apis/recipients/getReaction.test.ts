import { getReaction } from '@apis/reactions/getReaction';
import { instanceWithTeamId as instance } from '@apis/axios';
import { EmojiString } from '@apis/reactions/postReaction';

jest.mock('@apis/axios', () => ({
  instanceWithTeamId: {
    get: jest.fn()
  }
}));

describe('getReaction', () => {
  const mockResponse = {
    data: {
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          id: 1,
          recipientId: 123,
          type: 'increase',
          emoji: ':thumbsup:' as EmojiString,
          count: 5
        },
        {
          id: 2,
          recipientId: 123,
          type: 'decrease',
          emoji: ':thumbsdown:' as EmojiString,
          count: 2
        }
      ]
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (instance.get as jest.Mock).mockResolvedValue(mockResponse);
  });

  it('리액션을 성공적으로 가져와야 한다', async () => {
    const result = await getReaction({ recipientId: 123 });

    expect(instance.get).toHaveBeenCalledWith('/recipients/123/reactions/');
    expect(result).toEqual(mockResponse.data);
  });

  it('API 호출이 실패하면 에러를 던져야 한다', async () => {
    const error = new Error('API Error');
    (instance.get as jest.Mock).mockRejectedValue(error);

    await expect(getReaction({ recipientId: 123 })).rejects.toThrow('API Error');
  });

  it('응답 데이터가 예상한 형식을 가져야 한다', async () => {
    const result = await getReaction({ recipientId: 123 });
    
    expect(result).toHaveProperty('count');
    expect(result).toHaveProperty('next');
    expect(result).toHaveProperty('previous');
    expect(result).toHaveProperty('results');
    expect(Array.isArray(result.results)).toBe(true);
    
    if (result.results.length > 0) {
      const firstReaction = result.results[0];
      expect(firstReaction).toHaveProperty('id');
      expect(firstReaction).toHaveProperty('recipientId');
      expect(firstReaction).toHaveProperty('type');
      expect(firstReaction).toHaveProperty('emoji');
      expect(firstReaction).toHaveProperty('count');
    }
  });
}); 