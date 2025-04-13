'use client';

import { useState } from 'react';

import classNames from 'classnames/bind';
import { useParams } from 'next/navigation';

import { Message } from '@apis/types/Message';
import { useModalStore } from '@stores/useModalStore';

import AddMessageCard from './AddMessageCard';
import MessageCard from './MessageCard';
import styles from './MessageCardListWithModal.module.scss';
import CardModal from '../../../components/Modals/CardModal';
import Modal from '../../../components/Modals/Modal';

const cx = classNames.bind(styles);

interface MessageCardListWithModalProps {
  messages: Message[];
  isEditMode: boolean;
}

export default function MessageCardListWithModal({ messages, isEditMode }: MessageCardListWithModalProps) {
  const { isModalOpen, openModal, closeModal } = useModalStore();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const params = useParams();

  const handleClickMessageCard = (message: Message) => {
    setSelectedMessage(message);
    openModal();
  };

  return (
    <div className={cx('message-card-list-with-modal')}>
      <AddMessageCard id={params.id as string} />
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          onClick={() => handleClickMessageCard(message)}
          isEditMode={isEditMode}
        />
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          closeModal();
          setSelectedMessage(null);
        }}
      >
        <CardModal
          message={selectedMessage!}
          handleClickClose={() => {
            closeModal();
            setSelectedMessage(null);
          }}
        />
      </Modal>
    </div>
  );
}
