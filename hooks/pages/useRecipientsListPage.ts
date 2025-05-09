import { useRecipientsListInfinite } from '@queries/useRecipientQueries';

/**
 * 인기 및 최근 롤링페이퍼 리스트 데이터를 로드하는 훅
 * @returns popular, recent 두 종류의 롤링페이퍼 데이터와 함께 무한 스크롤 관련 데이터
 */
export const useRecipientsListPage = () => {
  const {
    data: popularData,
    fetchNextPage: fetchNextPopular,
    hasNextPage: hasNextPopular,
    isFetchingNextPage: isFetchingNextPopular,
  } = useRecipientsListInfinite({ limit: 8, sort: 'popular' });

  const {
    data: recentData,
    fetchNextPage: fetchNextRecent,
    hasNextPage: hasNextRecent,
    isFetchingNextPage: isFetchingNextRecent,
  } = useRecipientsListInfinite({ limit: 8, sort: 'recent' });

  // 인기 롤링페이퍼(popular) 데이터
  const popularRecipients = popularData?.pages.flatMap((page) => page.results) || [];

  // 최근 롤링페이퍼(recent) 데이터
  const recentRecipients = recentData?.pages.flatMap((page) => page.results) || [];

  // 인기 캐러셀이 끝에 도달했을 때 호출되는 핸들러
  const handleReachEndPopular = () => {
    if (hasNextPopular && !isFetchingNextPopular) {
      fetchNextPopular();
    }
  };

  // 최근 캐러셀이 끝에 도달했을 때 호출되는 핸들러
  const handleReachEndRecent = () => {
    if (hasNextRecent && !isFetchingNextRecent) {
      fetchNextRecent();
    }
  };

  return {
    // 인기 롤링페이퍼 관련 데이터
    popularRecipients,
    fetchNextPopular,
    hasNextPopular,
    isFetchingNextPopular,
    handleReachEndPopular,

    // 최근 롤링페이퍼 관련 데이터
    recentRecipients,
    fetchNextRecent,
    hasNextRecent,
    isFetchingNextRecent,
    handleReachEndRecent,
  };
}; 