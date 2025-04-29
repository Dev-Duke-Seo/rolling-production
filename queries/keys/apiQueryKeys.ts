import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';

// message API 쿼리 키
// post put patch delete->mutation
const messageKeys = createQueryKeys('message', {
  list: (params: { recipientId: number; limit?: number; offset?: number }) => [params],
});

// recipients API 쿼리 키
const recipientsKeys = createQueryKeys('recipients', {
  all: null,
  list: (params: { limit?: number; offset?: number; sort?: 'popular' | 'recent' } = { limit: 8, offset: 0 }) => [
    params,
  ],
  byId: (recipientId: number) => [recipientId],
});

const reactionsKeys = createQueryKeys('reactions', {
  byId: ([recipientId, params]: [number, { limit?: number; offset?: number }]) => [recipientId, params],
});

// background-images 쿼리 키
const publicApiKeys = createQueryKeys('publicApi', {
  backgroundImages: null,
  profileImages: null,
});

export const queries = mergeQueryKeys(messageKeys, recipientsKeys, reactionsKeys, publicApiKeys);
