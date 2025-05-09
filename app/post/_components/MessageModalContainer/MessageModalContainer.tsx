import React, { useState } from 'react';

import { Message } from '@apis/types/Message';

import CardModal from '@components/Modals/CardModal';
import Modal from '@components/Modals/Modal';

interface MessageModalContainerProps {
  children: React.ReactNode;
  isEditMode: boolean;
}

export default function MessageModalContainer({ children, isEditMode }: MessageModalContainerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleClickMessageCard = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <>
      {/* children에게 onMessageClick 함수를 전달하기 위해 React.cloneElement 사용 */}
      {React.cloneElement(children as React.ReactElement, {
        onMessageClick: handleClickMessageCard,
        isEditMode,
      })}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedMessage && <CardModal message={selectedMessage} handleClickClose={handleCloseModal} />}
      </Modal>
    </>
  );
}
