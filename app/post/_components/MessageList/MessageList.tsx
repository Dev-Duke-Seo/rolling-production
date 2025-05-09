import classNames from 'classnames/bind';
import { useParams } from 'next/navigation';

import { Message } from '@apis/types/Message';

import styles from './MessageList.module.scss';
import AddMessageCard from '../AddMessageCard';
import MessageCard from '../MessageCard';

const cx = classNames.bind(styles);

interface MessageListProps {
  messages: Message[];
  isEditMode: boolean;
  onMessageClick: (message: Message) => void;
}

export default function MessageList({ messages, isEditMode, onMessageClick }: MessageListProps) {
  const params = useParams();

  return (
    <div className={cx('message-list')}>
      <AddMessageCard id={params.id as string} />
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          onClick={() => onMessageClick(message)}
          isEditMode={isEditMode}
        />
      ))}
    </div>
  );
}
