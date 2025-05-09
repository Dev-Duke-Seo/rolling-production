'use client';

import classNames from 'classnames/bind';

import { Message } from '@apis/types/Message';

import styles from './MessageCardListWithModal.module.scss';
import MessageList from './MessageList/MessageList';
import MessageModalContainer from './MessageModalContainer/MessageModalContainer';

const cx = classNames.bind(styles);

interface MessageCardListWithModalProps {
  messages: Message[];
  isEditMode: boolean;
}

export default function MessageCardListWithModal({ messages, isEditMode }: MessageCardListWithModalProps) {
  return (
    <div className={cx('message-card-list-with-modal')}>
      <MessageModalContainer isEditMode={isEditMode}>
        <MessageList
          messages={messages}
          isEditMode={isEditMode}
          onMessageClick={() => {}} // MessageModalContainer에서 덮어씌울 예정
        />
      </MessageModalContainer>
    </div>
  );
}
