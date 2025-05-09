'use client';

import classNames from 'classnames/bind';

import MessageCardListWithModal from '@/app/post/_components/MessageCardListWithModal';
import { useInfiniteScroll } from '@/src/shared/hooks/useInfiniteScroll';
import { MessagePreview, UrlString } from '@apis/types/Recipient';
import { useInfiniteMessages } from '@queries/useMessageQueries';
import { useRecipientById } from '@queries/useRecipientQueries';

import DeleteRecipientButton from '@components/Buttons/DeleteButton';
import ServiceHeader from '@components/ServiceHeader/ServiceHeader';
import Explanation from '@components/Tab/Explanation';

import styles from './PostByIdPage.module.scss';

const cx = classNames.bind(styles);

export default function PostByIdPage({ params, isEditMode = false }: { params: { id: string }; isEditMode: boolean }) {
  // query
  const { data: recipient } = useRecipientById(Number(params.id));

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteMessages(Number(params.id));

  const observerRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage, {
    rootMargin: '0px 0px 300px 0px',
  });

  const messages = data?.pages.flatMap((page) => page.results) || [];

  if (!recipient) {
    return <div>로딩 중...</div>;
  }

  const { backgroundColor, backgroundImageURL, messageCount, recentMessages } = recipient;
  const profileImages = (recentMessages as MessagePreview[]).map((message: MessagePreview) => message.profileImageURL);

  return (
    <div
      className={cx('post-by-id-page', {
        [`${backgroundColor}`]: !backgroundImageURL, // backgroundImageURL이 없을 때만 backgroundColor를 클래스명으로 사용
      })}
      style={backgroundImageURL ? { backgroundImage: `url(${backgroundImageURL})` } : {}}
    >
      <ServiceHeader
        title={recipient.name}
        messageCount={messageCount}
        profileImages={profileImages.filter((image): image is UrlString => image !== null)}
      />
      <MessageCardListWithModal messages={messages} isEditMode={isEditMode} />
      {isEditMode && (
        <div className={cx('delete-button-container')}>
          <DeleteRecipientButton recipientId={Number(params.id)} />
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
