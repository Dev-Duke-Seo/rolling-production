'use client';

/* eslint-disable compat/compat */

import classNames from 'classnames/bind';

import Card from '@/app/list/_components/Card/Card';
import { UrlString } from '@apis/types/Recipient';
import { ColorchipColors } from '@constants/COLORS';

import { withLabel } from '@components/Label';

import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { useRecipientsListPage } from '@hooks/useRecipientsListPage';

import Carousel from './_components/Carousel';
import styles from './List.module.scss';

const cx = classNames.bind(styles);

const CarouselWithLabel = withLabel(Carousel);

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

  const PopularCards = popularRecipients.map((recipient) => (
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
    />
  ));

  const RecentCards = recentRecipients.map((recipient) => (
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
