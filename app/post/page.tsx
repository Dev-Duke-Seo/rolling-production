'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { postRecipients } from '@apis/recipients/postRecipients';
import { Recipient, UrlString } from '@apis/types/Recipient';
import { COLORCHIP_COLORS, ColorchipColors } from '@constants/COLORS';
import { FORM_ERROR_MESSAGES } from '@constants/Errors';
import { useBackgroundImages } from '@queries/usePublicApiQueries';
import { usePostRecipient } from '@queries/useRecipientQueries';

import Button from '@components/Buttons/Button';
import ColorChipList from '@components/ColorChip/ColorChipList';
import Input from '@components/Input';
import { withLabel } from '@components/Label';
import { ImageOption } from '@components/Option/ImageOption';
import { useNullableIndex } from '@components/Option/useNullableIndex';
import Explanation from '@components/Tab/Explanation';
import Tab, { TabPanel } from '@components/Tab/Tab';
import { useTab } from '@components/Tab/useTab';

import styles from './PostPage.module.scss';

const cx = classNames.bind(styles);

export default function PostPage() {
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

  // HOC Component
  const InputWithLabel = withLabel(Input);
  const ExplanationWithLabel = withLabel(Explanation);

  // Submit 버튼 관련
  const router = useRouter();

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

    const data = await postRecipient(requestData);

    if (!data) {
      return;
    }

    const { id } = data;

    router.push(`/post/${id}/message`);
  }, [nullableIndex, selectedTab]);

  return (
    <div className={cx('post-page')}>
      <div className={cx('width-box')}>
        <div className={cx('input-container')}>
          <InputWithLabel
            label={'To'}
            placeholder={'받는 사람 이름을 입력해 주세요'}
            fullSize
            register={register}
            registerLabel={'to'}
            error={errors}
            required
          />
        </div>
      </div>
      <div className={cx('width-box')}>
        <div className={cx('explanation-container')}>
          <ExplanationWithLabel label={'배경화면을 선택해주세요.'}>
            컬러를 선택하거나, 이미지를 선택할 수 있습니다.
          </ExplanationWithLabel>

          <Tab selectedTab={selectedTab} handleTabChange={handleTabChange} callback={resetIndex}>
            <TabPanel label={'컬러'}>
              <ColorChipList
                colorOptions={COLORCHIP_COLORS}
                handleClickItem={handleIndexChange}
                chosenIndex={nullableIndex}
              />
            </TabPanel>
            <TabPanel label={'이미지'}>
              <ImageOption
                imageUrls={backgroundImages as UrlString[]}
                chosenIndex={nullableIndex}
                handleClickItem={handleIndexChange}
              />
            </TabPanel>
          </Tab>
        </div>
      </div>
      <div className={cx('width-box')}>
        <div className={cx('button-container')}>
          <Button type={'primary'} size={'full'} handleClickButton={handleSubmit(onSubmit)}>
            생성하기
          </Button>
        </div>
      </div>
    </div>
  );
}
