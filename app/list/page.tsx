'use client';

import { useEffect, useRef } from 'react';

import classNames from 'classnames/bind';

import Card from '@/app/list/_components/Card/Card';
import { UrlString } from '@apis/types/Recipient';
import { ColorchipColors } from '@constants/COLORS';
import { useRecipientsListInfinite } from '@queries/useRecipientQueries';

import { withLabel } from '@components/Label';

import Carousel from './_components/Carousel';
import styles from './List.module.scss';

const cx = classNames.bind(styles);

const CarouselWithLabel = withLabel(Carousel);

export default function List() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useRecipientsListInfinite({ limit: 8 });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 캐러셀이 끝에 도달했을 때 호출되는 핸들러
  const handleReachEnd = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // eslint-disable-next-line compat/compat
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log('fetching next page');
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 모든 페이지의 데이터를 합침
  const allRecipients = data?.pages.flatMap((page) => page.results) || [];

  // TODO: 정렬 제대로 되는지 확인
  const CardsByMessageCount = [...allRecipients]
    .sort((a, b) => b.messageCount - a.messageCount)
    .map((recipient) => (
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

  const CardsSortedByRecent = [...allRecipients]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((recipient) => (
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
        onReachEnd={handleReachEnd}
        itemWidth={275}
        itemGap={20}
        ref={loadMoreRef}
      >
        {CardsByMessageCount}
      </CarouselWithLabel>
      <CarouselWithLabel
        label={'최근에 작성된 롤링 페이퍼 ⭐️'}
        numberOfContentsToDisplay={4}
        onReachEnd={handleReachEnd}
        itemWidth={275}
        itemGap={20}
        ref={loadMoreRef}
      >
        {CardsSortedByRecent}
      </CarouselWithLabel>
    </div>
  );
}
