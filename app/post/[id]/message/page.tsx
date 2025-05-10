'use client';

import classNames from 'classnames/bind';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import Button from '@components/Buttons/Button';
import Dropdown from '@components/Dropdown';
import Input from '@components/Input';
import Label, { withLabel } from '@components/Label';
import ProfileImageItem from '@components/ServiceHeader/ProfileImageItem';
import ProfileImageList from '@components/ServiceHeader/ProfileImageList';
import Explanation from '@components/Tab/Explanation';

import { useMessageForm } from '@hooks/pages';

import styles from './PostPage_id.module.scss';

const cx = classNames.bind(styles);

// dynamic Import editor
const Editor = dynamic(() => import('edit-on-slate').then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <div>로딩 중...</div>,
});

/**
 * 메시지 작성 페이지
 * 선택한 롤링페이퍼에 메시지를 추가하는 기능을 제공합니다.
 */
export default function MessagePage() {
  const { id } = useParams();
  const recipientId = Number(id);

  const {
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
    relationshipOptions,

    // 이벤트 핸들러
    onSubmit,
  } = useMessageForm(recipientId);

  // HOC Components
  const InputWithLabel = withLabel(Input);
  const DropdownRelationshipWithLabel = withLabel(Dropdown);

  return (
    <div className={cx('post-page')}>
      <div className={cx('width-box')}>
        <InputWithLabel
          label='From.'
          registerLabel={'from'}
          register={register}
          placeholder={'이름을 입력해 주세요'}
          error={formState.errors}
          fullSize
          required
        />
      </div>

      <div className={cx('width-box')}>
        <Label>프로필 이미지</Label>
        <div className={cx('profile-image-box')}>
          <div className={cx('selected-image')}>
            <ProfileImageItem
              type={'profile'}
              imageUrl={selectedProfileImage ?? DEFAULT_PROFILE_IMAGE_URL}
              selectionType={'custom'}
              imageSize={8}
            />
          </div>
          <div className={cx('profile-image-list')}>
            <Explanation>프로필 이미지를 선택해 주세요.</Explanation>
            <ProfileImageList
              imageUrls={profileImages ?? []}
              selectionType={'selection'}
              onClick={handleProfileImageSelect}
            />
          </div>
        </div>
      </div>

      <div className={cx('width-box')}>
        <DropdownRelationshipWithLabel
          label='상대와의 관계'
          placeholder='관계를 선택해 주세요'
          list={relationshipOptions}
          selectedItem={selectedRelationship}
          onSelect={setSelectedRelationship}
        />
      </div>

      <div className={cx('width-box')}>
        <Label>메시지를 입력해 주세요</Label>
        <Editor
          value={content}
          onChange={handleEditorChange}
          placeholder='메시지를 입력하세요'
          editorStyle={{
            border: 'none',
            boxShadow: 'none',
            minHeight: '200px',
          }}
        />
      </div>

      <div className={cx('width-box')}>
        <Button type='primary' size={'full'} handleClickButton={handleSubmit(onSubmit)}>
          생성하기
        </Button>
      </div>
    </div>
  );
}
