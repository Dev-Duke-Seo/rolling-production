import classNames from 'classnames/bind';
import { Descendant } from 'edit-on-slate';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { Message } from '@apis/types/Message';

import Badge from '@components/Badge';
import DeleteMessageButton from '@components/Buttons/DeleteMessageButton';

import { DEFAULT_PROFILE_IMAGE_URL, formatDate, parseMessageContent } from '@utils/messageUtils';

import styles from './MessageCard.module.scss';

// ReadOnlyEditor를 다이나믹 임포트로 변경
const ReadOnlyEditor = dynamic(() => import('edit-on-slate').then((mod) => mod.ReadOnlyEditor), {
  ssr: false,
  loading: () => <div>로딩 중...</div>,
});

const cx = classNames.bind(styles);
interface MessageCardProps {
  message: Message;
  onClick?: () => void;
  isEditMode?: boolean;
}

export default function MessageCard({ message, onClick, isEditMode }: MessageCardProps) {
  const { content, createdAt, sender, profileImageURL, relationship } = message;

  // 메시지 내용을 Slate 에디터 형식으로 파싱
  const contentValue = parseMessageContent(content);

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
            src={profileImageURL ?? DEFAULT_PROFILE_IMAGE_URL}
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
          value={contentValue as Descendant[]}
          editorStyle={{ width: '100%', border: 'none', boxShadow: 'none', minHeight: '20rem', maxHeight: '10rem' }}
          containerStyle={{ width: '100%', padding: '0', boxShadow: 'none', border: 'none' }}
        />
      </section>
      <footer className={cx('footer')}>
        <div className={cx('created-at')}>{formatDate(createdAt)}</div>
      </footer>
      <div className={cx('delete-button-container')}>{isEditMode && <DeleteMessageButton cardId={message.id} />}</div>
    </div>
  );
}
