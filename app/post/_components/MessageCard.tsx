import classNames from 'classnames/bind';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { Message } from '@apis/types/Message';

import Badge from '@components/Badge';
import DeleteMessageButton from '@components/Buttons/DeleteMessageButton';

import styles from './MessageCard.module.scss';

// ReadOnlyEditor를 다이나믹 임포트로 변경
const ReadOnlyEditor = dynamic(() => import('edit-on-slate').then((mod) => mod.ReadOnlyEditor), {
  ssr: false,
  loading: () => <div>로딩 중...</div>,
});

const cx = classNames.bind(styles);

export const toDateString = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\s/g, '')
    .replace(/\.$/, '');
};

interface MessageCardProps {
  message: Message;
  onClick?: () => void;
  isEditMode?: boolean;
}

export default function MessageCard({ message, onClick, isEditMode }: MessageCardProps) {
  const { content, createdAt, sender, profileImageURL, relationship } = message;

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={cx('message-card')}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`From ${sender}${relationship ? `, ${relationship}` : ''}`}
    >
      <header className={cx('header')}>
        <div className={cx('profile-image')}>
          <Image
            src={profileImageURL ?? ''}
            className={cx('profile-image-img')}
            alt={`${sender}님의 프로필 이미지`}
            width={40}
            height={40}
          />
        </div>
        <div className={cx('sender')}>
          <div className={cx('sender-name')}>
            From. <span className={cx('sender-name-text')}>{sender}</span>
          </div>
          <Badge relationship={relationship} />
        </div>
      </header>
      <div className={cx('divider')} aria-hidden='true' />
      <section className={cx('content')}>
        <ReadOnlyEditor
          value={contentValue}
          editorStyle={{ width: '100%', border: 'none', boxShadow: 'none', minHeight: '20rem', maxHeight: '10rem' }}
          containerStyle={{ width: '100%', padding: '0', boxShadow: 'none', border: 'none' }}
        />
      </section>
      <footer className={cx('footer')}>
        <div className={cx('created-at')}>{toDateString(createdAt)}</div>
      </footer>
      <div className={cx('delete-button-container')}>{isEditMode && <DeleteMessageButton cardId={message.id} />}</div>
    </div>
  );
}
