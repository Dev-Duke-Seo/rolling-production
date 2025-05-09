import React from 'react';

import CardModal from '@components/Modals/CardModal';
import Modal from '@components/Modals/Modal';

import { useModalState } from '@hooks/useModalState';

interface MessageModalContainerProps {
  children: React.ReactNode;
  isEditMode: boolean;
}

/**
 * 메시지 모달 컨테이너 컴포넌트
 * 자식 컴포넌트에게 메시지 클릭 핸들러를 주입하고, 모달 상태를 관리함
 */
export default function MessageModalContainer({ children, isEditMode }: MessageModalContainerProps) {
  const { isModalOpen, selectedMessage, openModal, closeModal } = useModalState();

  return (
    <>
      {/* children에게 onMessageClick 함수를 전달하기 위해 React.cloneElement 사용 */}
      {React.cloneElement(children as React.ReactElement, {
        onMessageClick: openModal,
        isEditMode,
      })}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMessage && <CardModal message={selectedMessage} handleClickClose={closeModal} />}
      </Modal>
    </>
  );
}
