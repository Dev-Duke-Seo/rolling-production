import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import CloseIcon from '@icons/close.svg?component';
import CompletedIcon from '@icons/completed.svg?component';
import { useToastStore } from '@stores/useToastStore';

import styles from './Toast.module.scss';

const cn = classNames.bind(styles);
interface ToastProps {
  id: string;
  type: 'success' | 'error';
  message: string;
  duration?: number; // 지속시간(ms)
}

/*
TODO:1) Add close button functionality
TODO:2) Add Timer to close the toast after 5 seconds
TODO:3) Add error toast
TODO:4) Z-index of toast should be higher than the header
TODO:5) Add animation to toast
TODO:6) Add toast State(Global) -> zustand
 */

export default function Toast({ id, type, message, duration = 5000 }: ToastProps) {
  const removeToast = useToastStore((state) => state.removeToast);
  const [timeLeft, setTimeLeft] = useState(100);

  useEffect(() => {
    const interval = 50; // 타이머 업데이트 간격(ms)
    const steps = duration / interval;
    const decrementPerStep = 100 / steps;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);

          return 0;
        }

        return prev - decrementPerStep;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [duration]);

  const handleClose = () => {
    removeToast(id);
  };

  return (
    <div className={cn('toast', type)}>
      <div className={cn('toast-content')}>
        <div className={cn('align')}>
          {type === 'success' && <CompletedIcon />}
          <p>{message}</p>
        </div>
        <CloseIcon className={cn('close-button')} onClick={handleClose} />
      </div>
      <div className={cn('timer-bar-container')}>
        <div className={cn('timer-bar')} style={{ width: `${timeLeft}%` }} />
      </div>
    </div>
  );
}
