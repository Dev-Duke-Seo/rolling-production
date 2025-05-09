import { MessagePreview, UrlString } from '@apis/types/Recipient';
import { useInfiniteMessages } from '@queries/useMessageQueries';
import { useRecipientById } from '@queries/useRecipientQueries';

/**
 * 롤링페이퍼 상세 페이지에 필요한 데이터를 로드하는 훅
 * @param recipientId 롤링페이퍼 id
 * @returns 롤링페이퍼 상세 정보, 메시지 목록, 무한 스크롤 관련 데이터
 */
export const useRecipientDetailPage = (recipientId: number) => {
  // 롤링페이퍼 정보 조회
  const { data: recipient, isLoading: isRecipientLoading } = useRecipientById(recipientId);

  // 메시지 목록 무한 스크롤 조회
  const { data: messagesData, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteMessages(recipientId);

  // 메시지 데이터 가공
  const messages = messagesData?.pages.flatMap((page) => page.results) || [];

  // 프로필 이미지 추출
  const profileImages = recipient?.recentMessages
    ? (recipient.recentMessages as MessagePreview[])
        .map((message: MessagePreview) => message.profileImageURL)
        .filter((image): image is UrlString => image !== null)
    : [];

  return {
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
  };
};
