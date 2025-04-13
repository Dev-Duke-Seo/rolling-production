'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';

import classNames from 'classnames/bind';

import styles from './Modal.module.scss';

const cn = classNames.bind(styles);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: PropsWithChildren<ModalProps>) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 클릭한 곳이 모달 내부가 아니면 onClose 실행
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // ESC 키를 누르면 모달 닫기
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // 모달이 열려있을 때만 이벤트 리스너 추가
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    // 컴포넌트 언마운트 또는 의존성 변경 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <dialog id='modal' className={cn('back-drop')}>
        <article role='document' ref={modalRef} className={cn('modal-content')}>
          {children}
        </article>
      </dialog>
    )
  );
}
