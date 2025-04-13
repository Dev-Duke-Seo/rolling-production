'use client';

import { forwardRef, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';

import ArrowButton from '@components/Buttons/ArrowButton';

import styles from './Carousel.module.scss';

const cx = classNames.bind(styles);

const MOBILE_BREAKPOINT = 768;
const AUTO_SLIDE_INTERVAL = 2000;

interface CarouselProps {
  numberOfContentsToDisplay?: number;
  onReachEnd?: () => void;
  itemWidth?: number;
  itemGap?: number;
  ref?: React.RefObject<HTMLDivElement>;
}

function Carousel({
  children,
  numberOfContentsToDisplay = 2,
  itemWidth = 275,
  itemGap = 20,
  onReachEnd,
  ref,
}: PropsWithChildren<CarouselProps>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(numberOfContentsToDisplay);
  const totalItems = (children as React.ReactNode[]).length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 정지 함수
  const stopAutoInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 최대 인덱스 계산
  const maxIndex = Math.ceil(totalItems - displayCount);

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
  }, [totalItems, displayCount, stopAutoInterval]);

  // 끝에 도달했을 때 새 데이터 로드 트리거
  useEffect(() => {
    const isAtEnd = currentIndex >= Math.floor(totalItems - displayCount);

    if (isAtEnd && onReachEnd) {
      onReachEnd();
    }
  }, [currentIndex, displayCount, totalItems, onReachEnd]);

  // Styles 계산
  const carouselStyles = {
    itemList: {
      width: `${itemWidth * displayCount + itemGap * (displayCount - 1)}px`,
      transform: `translateX(-${currentIndex * (itemWidth + itemGap)}px)`,
    },
  };

  return (
    <div className={cx('carousel')}>
      <div className={cx('carousel-container')}>
        <div className={cx('carousel-button', 'left', { 'is-first': currentIndex === 0 })}>
          <ArrowButton direction='left' onClick={handleClickLeft} />
        </div>
        <div className={cx('item-list')} style={carouselStyles.itemList}>
          {children}
          <div className={cx('load-more')} ref={ref} />
        </div>
        <div
          className={cx('carousel-button', 'right', {
            'is-last': currentIndex >= maxIndex,
          })}
        >
          <ArrowButton direction='right' onClick={handleClickRight} />
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Carousel);
