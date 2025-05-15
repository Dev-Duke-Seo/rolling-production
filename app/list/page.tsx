'use client';

/* eslint-disable compat/compat */

import { useEffect } from 'react';

import classNames from 'classnames/bind';

import Card from '@/app/list/_components/Card/Card';
import { UrlString } from '@apis/types/Recipient';
import { ColorchipColors } from '@constants/COLORS';

import { withLabel } from '@components/Label';

import { useInfiniteScroll } from '@hooks/common/useInfiniteScroll';
import { useRecipientsListPage } from '@hooks/pages/useRecipientsListPage';

import Carousel from './_components/Carousel';
import styles from './List.module.scss';

const cx = classNames.bind(styles);

const CarouselWithLabel = withLabel(Carousel);

// 미리 이미지 로드 함수
const preloadImage = (url: string | null) => {
  if (!url || typeof window === 'undefined') return;

  const optimizedUrl = url.replace(/picsum\.photos\/id\/(\d+)\/\d+\/\d+/, 'picsum.photos/id/$1/300/300');
  const img = new Image();
  img.src = optimizedUrl;
};

export default function List() {
  const {
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
  } = useRecipientsListPage();

  const loadMorePopularRef = useInfiniteScroll(fetchNextPopular, hasNextPopular, isFetchingNextPopular, {
    threshold: 1,
  });

  const loadMoreRecentRef = useInfiniteScroll(fetchNextRecent, hasNextRecent, isFetchingNextRecent, { threshold: 1 });

  // 초기 데이터 로딩 후 첫 4개 이미지 미리 로드
  useEffect(() => {
    if (popularRecipients.length > 0) {
      // 인기 롤링페이퍼 첫 4개 프리로드
      popularRecipients.slice(0, 4).forEach((recipient) => {
        preloadImage(recipient.backgroundImageURL);
      });

      // 최근 롤링페이퍼 첫 2개 프리로드
      if (recentRecipients.length > 0) {
        recentRecipients.slice(0, 2).forEach((recipient) => {
          preloadImage(recipient.backgroundImageURL);
        });
      }
    }
  }, [popularRecipients, recentRecipients]);

  const PopularCards = popularRecipients.map((recipient, index) => (
    <Card
      key={recipient.id}
      backgroundColor={recipient.backgroundColor as ColorchipColors}
      name={recipient.name}
      id={recipient.id}
      backgroundImageURL={recipient.backgroundImageURL as UrlString}
      messageCount={recipient.messageCount}
      recentMessages={recipient.recentMessages}
      reactionCount={recipient.reactionCount}
      topReactions={recipient.topReactions}
      index={index} // 인덱스 추가
    />
  ));

  const RecentCards = recentRecipients.map((recipient, index) => (
    <Card
      key={recipient.id}
      backgroundColor={recipient.backgroundColor as ColorchipColors}
      name={recipient.name}
      id={recipient.id}
      backgroundImageURL={recipient.backgroundImageURL as UrlString}
      messageCount={recipient.messageCount}
      recentMessages={recipient.recentMessages}
      reactionCount={recipient.reactionCount}
      topReactions={recipient.topReactions}
      index={index + 20} // 인덱스 추가 (인기 이후에 표시되므로 인덱스 오프셋 추가)
    />
  ));

  return (
    <div className={cx('list')}>
      <CarouselWithLabel
        label={'인기 롤링 페이퍼 🔥'}
        numberOfContentsToDisplay={4}
        onReachEnd={handleReachEndPopular}
        itemWidth={275}
        itemGap={20}
        ref={loadMorePopularRef}
      >
        {PopularCards}
      </CarouselWithLabel>
      <CarouselWithLabel
        label={'최근에 작성된 롤링 페이퍼 ⭐️'}
        numberOfContentsToDisplay={4}
        onReachEnd={handleReachEndRecent}
        itemWidth={275}
        itemGap={20}
        ref={loadMoreRecentRef}
      >
        {RecentCards}
      </CarouselWithLabel>
    </div>
  );
}