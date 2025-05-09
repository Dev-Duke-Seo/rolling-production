import { useState } from 'react';

import { Message } from '@apis/types/Message';

/**
 * 모달 상태를 관리하는 커스텀 훅
 * 메시지 모달 컴포넌트에서 상태와 로직을 분리하기 위해 사용
 *
 * @returns 모달 관련 상태와 핸들러 함수들
 */
export const useModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const openModal = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  return {
    isModalOpen,
    selectedMessage,
    openModal,
    closeModal,
  };
};
