'use client';

import classNames from 'classnames/bind';

import Card from '@/app/list/_components/Card/Card';
import { useInfiniteScroll } from '@/src/shared/hooks/useInfiniteScroll';
import { UrlString } from '@apis/types/Recipient';
import { ColorchipColors } from '@constants/COLORS';
import { useRecipientsListInfinite } from '@queries/useRecipientQueries';

import { withLabel } from '@components/Label';

import Carousel from './_components/Carousel';
import styles from './List.module.scss';

const cx = classNames.bind(styles);

const CarouselWithLabel = withLabel(Carousel);

export default function List() {
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

  const loadMorePopularRef = useInfiniteScroll(fetchNextPopular, hasNextPopular, isFetchingNextPopular, {
    threshold: 1,
  });

  const loadMoreRecentRef = useInfiniteScroll(fetchNextRecent, hasNextRecent, isFetchingNextRecent, { threshold: 1 });

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

  // 인기 롤링페이퍼(popular) 데이터
  const popularRecipients = popularData?.pages.flatMap((page) => page.results) || [];

  // 최근 롤링페이퍼(recent) 데이터
  const recentRecipients = recentData?.pages.flatMap((page) => page.results) || [];

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
