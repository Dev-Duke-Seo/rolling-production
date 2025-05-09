import { useCallback, useEffect, useRef, useState } from 'react';

const MOBILE_BREAKPOINT = 768;
const AUTO_SLIDE_INTERVAL = 2000;

interface UseCarouselProps {
  totalItems: number;
  numberOfContentsToDisplay?: number;
  itemWidth?: number;
  itemGap?: number;
  onReachEnd?: () => void;
  autoSlide?: boolean;
}

/**
 * 캐러셀 기능을 위한 커스텀 훅
 * @param props 캐러셀 설정 및 콜백 함수
 * @returns 캐러셀 상태 및 컨트롤 함수
 */
export const useCarousel = ({
  totalItems,
  numberOfContentsToDisplay = 2,
  itemWidth = 275,
  itemGap = 20,
  onReachEnd,
  autoSlide = true,
}: UseCarouselProps) => {
  // 상태 관리
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(numberOfContentsToDisplay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 정지 함수
  const stopAutoInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 최대 인덱스 계산
  const maxIndex = Math.max(0, totalItems - displayCount);

  // 오른쪽 버튼 핸들러
  const handleClickRight = useCallback(() => {
    stopAutoInterval();
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex, stopAutoInterval]);

  // 왼쪽 버튼 핸들러
  const handleClickLeft = useCallback(() => {
    stopAutoInterval();
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, [stopAutoInterval]);

  // 화면 크기 변경 및 모바일 여부 감지
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < MOBILE_BREAKPOINT;
      setDisplayCount(mobileView ? 1 : numberOfContentsToDisplay);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [numberOfContentsToDisplay]);

  // 자동 슬라이드
  useEffect(() => {
    if (!autoSlide) return;

    stopAutoInterval();

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= totalItems - displayCount) {
          stopAutoInterval();

          return prevIndex;
        }

        return prevIndex + 1;
      });
    }, AUTO_SLIDE_INTERVAL);

    return stopAutoInterval;
  }, [totalItems, displayCount, stopAutoInterval, autoSlide]);

  // 끝에 도달했을 때 새 데이터 로드 트리거
  useEffect(() => {
    const isAtEnd = currentIndex >= Math.floor(totalItems - displayCount);

    if (isAtEnd && onReachEnd) {
      onReachEnd();
    }
  }, [currentIndex, displayCount, totalItems, onReachEnd]);

  // 스타일 계산
  const carouselStyles = {
    itemList: {
      width: `${itemWidth * displayCount + itemGap * (displayCount - 1)}px`,
      transform: `translateX(-${currentIndex * (itemWidth + itemGap)}px)`,
    },
  };

  return {
    currentIndex,
    displayCount,
    maxIndex,
    handleClickLeft,
    handleClickRight,
    carouselStyles,
    isAtStart: currentIndex === 0,
    isAtEnd: currentIndex >= maxIndex,
  };
};
