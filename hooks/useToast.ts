import { useToastStore } from '@stores/useToastStore';

export function useToast() {
  const { addToast } = useToastStore();

  const showSuccessToast = (message: string) => {
    addToast({ type: 'success', message });
  };

  const showErrorToast = (message: string) => {
    addToast({ type: 'error', message });
  };

  const showToastWithDurationAndType = (message: string, duration: number, type: 'success' | 'error') => {
    addToast({ type, message, duration });
  };

  return {
    showSuccessToast,
    showErrorToast,
    showToastWithDurationAndType,
  };
}
