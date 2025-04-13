'use client';

import classNames from 'classnames/bind';

import { useToastStore } from '@stores/useToastStore';

import Toast from './Toast';
import styles from './ToastContainer.module.scss';

const cn = classNames.bind(styles);

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className={cn('toast-container')}>
      {toasts.map((toast) => (
        <Toast key={toast.id} id={toast.id} type={toast.type} message={toast.message} duration={toast.duration} />
      ))}
    </div>
  );
}
