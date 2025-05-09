import { create } from 'zustand';

// 매직 넘버를 상수로 추출
const DEFAULT_TOAST_DURATION_MS = 5000;

interface Toast {
  id: string;
  type: 'success' | 'error';
  message: string;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Date.now().toString();
    const duration = toast.duration || DEFAULT_TOAST_DURATION_MS;

    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    // 자동 제거 타이머 설정
    scheduleToastRemoval(id, duration, set);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  clearToasts: () => {
    set({ toasts: [] });
  },
}));

// 토스트 제거 로직을 별도 함수로 분리
function scheduleToastRemoval(
  id: string,
  duration: number,
  set: (fn: (state: ToastStore) => Partial<ToastStore>) => void,
) {
  setTimeout(() => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  }, duration);
}
