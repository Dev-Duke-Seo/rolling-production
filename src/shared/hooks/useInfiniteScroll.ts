import { useCallback, useEffect, useRef } from 'react';

/**
 * 무한 스크롤을 위한 커스텀 훅
 * @param fetchNextPage 다음 페이지를 로드하는 함수
 * @param hasNextPage 다음 페이지가 있는지 여부
 * @param isFetchingNextPage 다음 페이지 로딩 중인지 여부
 * @param options IntersectionObserver 옵션
 * @returns ref - 관찰할 대상 요소에 연결할 ref
 */
export const useInfiniteScroll = <T extends HTMLElement = HTMLDivElement>(
  fetchNextPage: () => void,
  hasNextPage: boolean | undefined,
  isFetchingNextPage: boolean,
  options?: IntersectionObserverInit,
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<T>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    // IntersectionObserver가 지원되지 않는 환경을 위한 폴백 처리
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver is not supported in this environment');

      return;
    }

    // 기존 observer 해제
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 새 observer 생성
    // eslint-disable-next-line compat/compat
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px 300px 0px',
      threshold: 1,
      ...options,
    });

    const currentRef = targetRef.current;

    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, options]);

  return targetRef;
};
