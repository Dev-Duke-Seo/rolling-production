'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import classNames from 'classnames/bind';
import { Descendant } from 'edit-on-slate';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';

import { getRecipientsById } from '@apis/recipients/getRecipientsById';
import { Font, PostMessageRequest } from '@apis/types/Message';
import { UrlString } from '@apis/types/Recipient';
import { useMutationMessage } from '@queries/useMessageQueries';
import { useProfileImages } from '@queries/usePublicApiQueries';

import { Relationship } from '@components/Badge';
import Button from '@components/Buttons/Button';
import Dropdown from '@components/Dropdown';
import Input from '@components/Input';
import Label, { withLabel } from '@components/Label';
import ProfileImageItem from '@components/ServiceHeader/ProfileImageItem';
import ProfileImageList from '@components/ServiceHeader/ProfileImageList';
import Explanation from '@components/Tab/Explanation';

import styles from './PostPage_id.module.scss';

const cx = classNames.bind(styles);

const DEFAULT_RELATIONSHIP_OPTIONS: Relationship[] = ['지인', '친구', '가족', '동료'];
const DEFAULT_FONT_OPTIONS: Font[] = ['Noto Sans', 'Pretendard'];

const DEFAULT_PROFILE_IMAGE_URL = 'https://placehold.co/600x400';

// dynamic Import editor
const Editor = dynamic(() => import('edit-on-slate').then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <div>로딩 중...</div>,
});

export default function MessagePage() {
  // Hooks
  const router = useRouter();
  const { id } = useParams();
  // HOC Components
  const InputWithLabel = withLabel(Input);
  const DropdownRelationshipWithLabel = withLabel(Dropdown);
  const { mutateAsync } = useMutationMessage(Number(id));

  // Forms
  const { handleSubmit, register, getValues, formState } = useForm({ mode: 'onSubmit' });

  const [content, setContent] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  // States
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState<UrlString | null>(null);
  const { data: profileImages } = useProfileImages();

  // Handlers
  const validateState = ({ relationship }: { relationship: Relationship | null }) => {
    if (!relationship) {
      return false;
    }

    return true;
  };

  const handleEditorChange = useCallback((newValue: Descendant[]) => {
    if (newValue && Array.isArray(newValue)) {
      setContent(newValue);
    }
  }, []);

  // Event Handlers
  const onClickButton = async () => {
    const { from } = getValues();

    if (!validateState({ relationship: selectedRelationship })) {
      // eslint-disable-next-line no-alert
      alert('모든 필드를 입력해 주세요');

      return;
    }

    const recipient = await getRecipientsById(Number(id));

    if (!recipient) {
      // eslint-disable-next-line no-alert
      alert('존재하지 않는 상대입니다.');

      return;
    }

    const { id: recipientId, backgroundColor } = recipient;

    const messageData: PostMessageRequest = {
      recipientId,
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
  };

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
              onClick={(imageUrl) => {
                setSelectedProfileImage(imageUrl as UrlString);
              }}
            />
          </div>
        </div>
      </div>

      <div className={cx('width-box')}>
        <DropdownRelationshipWithLabel
          label='상대와의 관계'
          placeholder='관계를 선택해 주세요'
          list={DEFAULT_RELATIONSHIP_OPTIONS}
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
        <Button type='primary' size={'full'} handleClickButton={handleSubmit(onClickButton)}>
          생성하기
        </Button>
      </div>
    </div>
  );
}
