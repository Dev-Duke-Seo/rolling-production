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

/**
 * 메시지 카드 목록과 모달 컴포넌트
 * MessageList와 MessageModalContainer를 조합해 메시지 목록 UI와 모달 기능을 제공
 */
export default function MessageCardListWithModal({ messages, isEditMode }: MessageCardListWithModalProps) {
  return (
    <div className={cx('message-card-list-with-modal')}>
      <MessageModalContainer isEditMode={isEditMode}>
        <MessageList
          messages={messages}
          isEditMode={isEditMode}
          onMessageClick={() => {}} // MessageModalContainer에서 덮어씌움
        />
      </MessageModalContainer>
    </div>
  );
}
