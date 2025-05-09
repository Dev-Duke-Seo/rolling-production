'use client';

import classNames from 'classnames/bind';

import MessageCardListWithModal from '@/app/post/_components/MessageCardListWithModal';
import { useRecipientDetailPage } from '@/src/domains/recipient/hooks/useRecipientDetailPage';
import { useInfiniteScroll } from '@/src/shared/hooks/useInfiniteScroll';

import DeleteRecipientButton from '@components/Buttons/DeleteButton';
import ServiceHeader from '@components/ServiceHeader/ServiceHeader';
import Explanation from '@components/Tab/Explanation';

import styles from './PostByIdPage.module.scss';

const cx = classNames.bind(styles);

export default function PostByIdPage({ params, isEditMode = false }: { params: { id: string }; isEditMode: boolean }) {
  const recipientId = Number(params.id);

  const {
    // 롤링페이퍼 데이터
    recipient,
    isRecipientLoading,

    // 메시지 목록 데이터
    messages,
    profileImages,

    // 무한 스크롤 관련 데이터
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRecipientDetailPage(recipientId);

  const observerRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage, {
    rootMargin: '0px 0px 300px 0px',
  });

  if (isRecipientLoading || !recipient) {
    return <div>로딩 중...</div>;
  }

  const { backgroundColor, backgroundImageURL } = recipient;

  return (
    <div
      className={cx('post-by-id-page', {
        [`${backgroundColor}`]: !backgroundImageURL, // backgroundImageURL이 없을 때만 backgroundColor를 클래스명으로 사용
      })}
      style={backgroundImageURL ? { backgroundImage: `url(${backgroundImageURL})` } : {}}
    >
      <ServiceHeader title={recipient.name} messageCount={recipient.messageCount} profileImages={profileImages} />
      <MessageCardListWithModal messages={messages} isEditMode={isEditMode} />
      {isEditMode && (
        <div className={cx('delete-button-container')}>
          <DeleteRecipientButton recipientId={recipientId} />
        </div>
      )}

      {hasNextPage || (
        <div className={cx('no-more-messages-container')}>
          <Explanation>모든 메시지를 읽었어요.</Explanation>
        </div>
      )}

      {/* 무한 스크롤을 위한 옵저버 영역 */}
      <div ref={observerRef} className={cx('observer-area')}>
        {isFetchingNextPage && <div className={cx('loading-indicator')}>로딩 중...</div>}
      </div>
    </div>
  );
}
