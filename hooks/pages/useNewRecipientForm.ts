import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Recipient, UrlString } from '@apis/types/Recipient';
import { COLORCHIP_COLORS, ColorchipColors } from '@constants/COLORS';
import { FORM_ERROR_MESSAGES } from '@constants/Errors';
import { useBackgroundImages } from '@queries/usePublicApiQueries';
import { usePostRecipient } from '@queries/useRecipientQueries';

import { useNullableIndex } from '@components/Option/useNullableIndex';
import { useTab } from '@components/Tab/useTab';

/**
 * 롤링페이퍼 생성 폼 로직을 담당하는 훅
 * @returns 폼 관련 상태 및 핸들러
 */
export const useNewRecipientForm = () => {
  const router = useRouter();
  const { mutateAsync: postRecipient } = usePostRecipient();
  const { nullableIndex, handleIndexChange, resetIndex } = useNullableIndex();
  const { selectedTab, handleTabChange } = useTab('컬러');
  const { data: backgroundImages } = useBackgroundImages();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  // 폼 제출 처리
  const onSubmit = useCallback(async () => {
    if (nullableIndex === null) {
      console.log(FORM_ERROR_MESSAGES.REQUIRED_INDEX);

      return;
    }

    const { to } = getValues();

    const selectedImage = selectedTab === '컬러' ? COLORCHIP_COLORS[nullableIndex] : backgroundImages?.[nullableIndex];

    const requestData: Pick<Recipient, 'name' | 'backgroundColor' | 'backgroundImageURL'> = {
      name: to,
      backgroundColor: selectedTab === '컬러' ? (selectedImage as ColorchipColors) : 'beige',
      backgroundImageURL: selectedTab === '이미지' ? (selectedImage as UrlString) : null,
    };

    try {
      const data = await postRecipient(requestData);

      if (!data) {
        return;
      }

      const { id } = data;
      router.push(`/post/${id}/message`);
    } catch (error) {
      console.error('롤링페이퍼 생성 실패:', error);
    }
  }, [nullableIndex, selectedTab, backgroundImages, getValues, postRecipient, router]);

  return {
    // 폼 상태
    register,
    errors,
    handleSubmit,

    // 탭 상태
    selectedTab,
    handleTabChange,
    // 선택 상태
    nullableIndex,
    handleIndexChange,
    resetIndex,

    // 데이터
    backgroundImages,
    colorOptions: COLORCHIP_COLORS,

    // 이벤트 핸들러
    onSubmit,
  };
};
