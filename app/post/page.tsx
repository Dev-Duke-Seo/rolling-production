'use client';

import classNames from 'classnames/bind';

import { UrlString } from '@apis/types/Recipient';

import Button from '@components/Buttons/Button';
import ColorChipList from '@components/ColorChip/ColorChipList';
import Input from '@components/Input';
import { withLabel } from '@components/Label';
import { ImageOption } from '@components/Option/ImageOption';
import Explanation from '@components/Tab/Explanation';
import Tab, { TabPanel } from '@components/Tab/Tab';

import { useNewRecipientForm } from '@hooks/pages';

import styles from './PostPage.module.scss';

const cx = classNames.bind(styles);

/**
 * 롤링페이퍼 생성 페이지
 * 롤링페이퍼 이름 입력 및 배경 선택 UI를 제공합니다.
 */
export default function PostPage() {
  const {
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
    colorOptions,

    // 이벤트 핸들러
    onSubmit,
  } = useNewRecipientForm();

  // HOC Component
  const InputWithLabel = withLabel(Input);
  const ExplanationWithLabel = withLabel(Explanation);

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
                colorOptions={colorOptions}
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
