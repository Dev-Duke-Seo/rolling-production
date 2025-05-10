import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Descendant } from 'edit-on-slate';
import { useRouter } from 'next/navigation';

import { getRecipientsById } from '@apis/recipients/getRecipientsById';
import { Font, PostMessageRequest } from '@apis/types/Message';
import { UrlString } from '@apis/types/Recipient';
import { useMutationMessage } from '@queries/useMessageQueries';
import { useProfileImages } from '@queries/usePublicApiQueries';

import { Relationship } from '@components/Badge';

/**
 * 메시지 작성 폼 로직을 담당하는 훅
 * @param recipientId 롤링페이퍼 ID
 * @returns 폼 관련 상태 및 핸들러
 */
export const useMessageForm = (recipientId: number) => {
  const router = useRouter();
  const { mutateAsync } = useMutationMessage(recipientId);

  // 폼 상태 관리
  const { handleSubmit, register, getValues, formState } = useForm({ mode: 'onSubmit' });

  // 에디터 상태
  const [content, setContent] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  // 선택 상태
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState<UrlString | null>(null);

  // 프로필 이미지 데이터
  const { data: profileImages } = useProfileImages();

  // 상수 데이터
  const DEFAULT_RELATIONSHIP_OPTIONS: Relationship[] = ['지인', '친구', '가족', '동료'];
  const DEFAULT_FONT_OPTIONS: Font[] = ['Noto Sans', 'Pretendard'];

  const DEFAULT_PROFILE_IMAGE_URL =
    'https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png';

  // 입력값 검증
  const validateState = useCallback(() => {
    if (!selectedRelationship) {
      return false;
    }

    return true;
  }, [selectedRelationship]);

  // 에디터 변경 핸들러
  const handleEditorChange = useCallback((newValue: Descendant[]) => {
    if (newValue && Array.isArray(newValue)) {
      setContent(newValue);
    }
  }, []);

  // 프로필 이미지 선택 핸들러
  const handleProfileImageSelect = useCallback((imageUrl: string) => {
    setSelectedProfileImage(imageUrl as UrlString);
  }, []);

  // 폼 제출
  const onSubmit = useCallback(async () => {
    const { from } = getValues();

    if (!validateState()) {
      // eslint-disable-next-line no-alert
      alert('모든 필드를 입력해 주세요');

      return;
    }

    const recipient = await getRecipientsById(recipientId);

    if (!recipient) {
      // eslint-disable-next-line no-alert
      alert('존재하지 않는 상대입니다.');

      return;
    }

    const { id: idFromRecipient, backgroundColor } = recipient;

    const messageData: PostMessageRequest = {
      recipientId: idFromRecipient,
      sender: from,
      relationship: selectedRelationship!,
      font: DEFAULT_FONT_OPTIONS[0],
      content: JSON.stringify(content),
      profileImageURL: selectedProfileImage ?? null,
      backgroundColor,
    };

    try {
      const response = await mutateAsync(messageData);
      // eslint-disable-next-line no-alert
      alert('메시지 생성이 완료되었습니다.');
      router.push(`/post/${response.recipientId}`);
    } catch (error) {
      // 에러 처리
      console.error('메시지 전송 실패:', error);
    }
  }, [getValues, validateState, recipientId, selectedRelationship, content, selectedProfileImage, mutateAsync, router]);

  return {
    // 폼 상태
    register,
    formState,
    handleSubmit,

    // 선택 상태
    selectedRelationship,
    setSelectedRelationship,

    // 에디터 상태
    content,
    handleEditorChange,

    // 프로필 이미지 관련
    profileImages,
    selectedProfileImage,
    handleProfileImageSelect,
    DEFAULT_PROFILE_IMAGE_URL,

    // 상수 데이터
    relationshipOptions: DEFAULT_RELATIONSHIP_OPTIONS,

    // 이벤트 핸들러
    onSubmit,
  };
};
