import classNames from 'classnames/bind';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { Message } from '@apis/types/Message';

import Badge from '@components/Badge';
import Button from '@components/Buttons/Button';

import styles from './CardModal.module.scss';
import { DEFAULT_PROFILE_IMAGE_URL, toDateString } from '../../app/post/_components/MessageCard';

const cx = classNames.bind(styles);

// TODO: props type 정의 및 props 적용
interface CardModalProps {
  message?: Message;
  handleClickClose: () => void;
}

const ReadOnlyEditor = dynamic(() => import('edit-on-slate').then((mod) => mod.ReadOnlyEditor), {
  ssr: false,
  loading: () => <div>로딩 중...</div>,
});

export default function CardModal({ message = {} as Message, handleClickClose }: CardModalProps) {
  const { sender, content, profileImageURL, createdAt, relationship } = message;

  const createdAtDate = toDateString(createdAt);

  // content가 JSON 형식인지 일반 텍스트인지 확인하고 적절히 처리
  let contentValue;

  try {
    // JSON 형식인 경우 파싱
    contentValue = JSON.parse(content);
  } catch (error) {
    // 일반 텍스트인 경우 Slate 형식으로 변환
    contentValue = [
      {
        type: 'paragraph',
        children: [{ text: content || '' }],
      },
    ];
  }

  return (
    <article className={cx('card-modal')}>
      <header className='header'>
        <div className={cx('writer')}>
          <div className={cx('image-wrapper')}>
            <Image
              src={profileImageURL ?? DEFAULT_PROFILE_IMAGE_URL}
              className={cx('profile-image-img')}
              alt={`${sender}님의 프로필 이미지`}
              width={40}
              height={40}
            />
          </div>
          <div className={cx('align-vertical')}>
            <h3 className={cx('from')}>
              From. <span className={cx('writer-name')}>{sender}</span>
            </h3>
            <Badge relationship={relationship} />
          </div>
        </div>
        <p className={cx('created-date')}>{createdAtDate}</p>
      </header>
      <div className={cx('horizon-line')} />
      <div className={cx('content-wrapper')}>
        <ReadOnlyEditor
          value={contentValue}
          containerStyle={{ width: '100%', boxShadow: 'none', border: 'none', maxHeight: '20rem' }}
          editorStyle={{ width: '100%', border: 'none', boxShadow: 'none' }}
        />
      </div>
      <Button type='primary' size={36} handleClickButton={handleClickClose}>
        확인
      </Button>
    </article>
  );
}
