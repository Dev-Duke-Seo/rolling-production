import { useMemo } from 'react';

type PathConfig = {
  text: string;
  linkTo: string;
  show: boolean;
};

type PathString = `/${string}` | 'NO_SHOW_PATH';

const PATH_CONFIG: Record<PathString, PathConfig> = {
  '/': {
    text: '롤링페이퍼 구경하기',
    linkTo: '/list',
    show: true,
  },
  '/list': {
    text: '롤링페이퍼 만들기',
    linkTo: '/post',
    show: true,
  },
  // 정규식으로 처리하던 경로들을 명시적으로 정의
  NO_SHOW_PATH: {
    text: '',
    linkTo: '',
    show: false,
  },
};

const NO_SHOW_PATH_MATCHER: RegExp[] = [/^\/post.*/];

export function usePathConfig(currentPath: string) {
  const config = useMemo(() => {
    const pathKey = currentPath as keyof typeof PATH_CONFIG;

    // 정확한 경로 매칭 먼저 시도
    if (PATH_CONFIG[pathKey]) {
      return PATH_CONFIG[pathKey];
    }

    // 정확한 매칭이 없으면 패턴 매칭 시도
    for (const matcher of NO_SHOW_PATH_MATCHER) {
      if (matcher.test(currentPath)) {
        return PATH_CONFIG.NO_SHOW_PATH;
      }
    }

    // 해당사항 없을시 기본값 반환
    return PATH_CONFIG['/'];
  }, [currentPath]);

  return { config };
}
