import { create } from 'zustand';

// 모달 타입을 추가하여 다양한 모달 지원
type ModalType = 'default' | 'alert' | 'confirm' | 'custom';

interface ModalData {
  type: ModalType;
  id: string;
  props?: Record<string, unknown>;
}

interface ModalStore {
  // 여러 모달 지원을 위한 배열
  modals: ModalData[];

  // 모달 열기 함수 - 타입과 ID 지정 가능
  openModal: (modalData: ModalData) => void;

  // ID로 특정 모달 닫기
  closeModal: (id: string) => void;

  // 모달 존재 여부 확인
  hasModal: (id: string) => boolean;

  // 모든 모달 닫기
  closeAllModals: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: [],

  openModal: (modalData) =>
    set((state) => ({
      modals: [...state.modals, modalData],
    })),

  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    })),

  hasModal: (id) => get().modals.some((modal) => modal.id === id),

  closeAllModals: () => set({ modals: [] }),
}));
