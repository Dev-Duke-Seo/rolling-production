'use client';

import { forwardRef, PropsWithChildren } from 'react';

import classNames from 'classnames/bind';

import ArrowButton from '@components/Buttons/ArrowButton';

import { useCarousel } from '@hooks/ui';

import styles from './Carousel.module.scss';

const cx = classNames.bind(styles);

interface CarouselProps {
  numberOfContentsToDisplay?: number;
  onReachEnd?: () => void;
  itemWidth?: number;
  itemGap?: number;
  autoSlide?: boolean;
  ref?: React.RefObject<HTMLDivElement>;
}

/**
 * 캐러셀 컴포넌트
 * 가로 스크롤 슬라이드 기능을 제공하며, 자동 슬라이드와 무한 스크롤 기능을 포함합니다.
 */
function Carousel({
  children,
  numberOfContentsToDisplay = 2,
  itemWidth = 275,
  itemGap = 20,
  onReachEnd,
  autoSlide = true,
  ref,
}: PropsWithChildren<CarouselProps>) {
  const childrenArray = children as React.ReactNode[];
  const totalItems = childrenArray.length;

  const { carouselStyles, handleClickLeft, handleClickRight, isAtStart, isAtEnd } = useCarousel({
    totalItems,
    numberOfContentsToDisplay,
    itemWidth,
    itemGap,
    onReachEnd,
    autoSlide,
  });

  return (
    <div className={cx('carousel')}>
      <div className={cx('carousel-container')}>
        <div className={cx('carousel-button', 'left', { 'is-first': isAtStart })}>
          <ArrowButton direction='left' onClick={handleClickLeft} />
        </div>
        <div className={cx('item-list')} style={carouselStyles.itemList}>
          {children}
          <div className={cx('load-more')} ref={ref} />
        </div>
        <div
          className={cx('carousel-button', 'right', {
            'is-last': isAtEnd,
          })}
        >
          <ArrowButton direction='right' onClick={handleClickRight} />
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Carousel);
