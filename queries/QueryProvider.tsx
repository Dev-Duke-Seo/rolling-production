'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

import { isAxiosError } from '@utils/errorHandler';

// 데이터 유형별 캐싱 설정
const CACHE_TIME_CONFIG = {
  longCache: {
    staleTime: 24 * 60 * 60 * 1000, // 24시간 (정적 데이터)
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7일
  },
  standardCache: {
    staleTime: 60 * 60 * 1000, // 1시간 (일반 데이터)
    gcTime: 3 * 60 * 60 * 1000, // 3시간
  },
  shortCache: {
    staleTime: 5 * 60 * 1000, // 5분 (자주 변경되는 데이터)
    gcTime: 30 * 60 * 1000, // 30분
  },
  noCache: {
    staleTime: 0, // 항상 최신 데이터 (실시간 데이터)
    gcTime: 5 * 60 * 1000, // 5분
  },
};

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: CACHE_TIME_CONFIG.standardCache.staleTime,
        gcTime: CACHE_TIME_CONFIG.standardCache.gcTime,

        retry: (failureCount, error: unknown) => {
          // 404 에러는 재시도 하지 않음
          if (isAxiosError(error) && error.response?.status === 404) return false;

          // 500번대 에러는 최대 2번만 재시도
          if (isAxiosError(error) && error.response?.status && error.response.status >= 500) return failureCount < 2;

          // 기본적으로 최대 3번 재시도
          return failureCount < 3;
        },

        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수 백오프 전략
      },
      mutations: {
        retry: false, // 변경 작업은 기본적으로 재시도 하지 않음
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    return createQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }

  return browserQueryClient;
}

// 외부에서 캐싱 설정에 접근할 수 있도록 export
export { CACHE_TIME_CONFIG };

export function QueryProvider({ children, useDevtools = false }: { children: React.ReactNode; useDevtools?: boolean }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      {useDevtools && <ReactQueryDevtools initialIsOpen />}
    </QueryClientProvider>
  );
}
