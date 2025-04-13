'use client';

import classNames from 'classnames/bind';

import ArrowLeft from '@icons/arrow_left.svg?component';
import ArrowRight from '@icons/arrow_right.svg?component';
import Ellipsis from '@icons/ellipse1.svg?component';

import styles from './ArrowButton.module.scss';

const cn = classNames.bind(styles);

export interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export default function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  return (
    <button type={'button'} className={cn('arrow-button')} onClick={onClick}>
      <Ellipsis className={cn('circle')} />
      <div className={cn('arrow')}>{direction === 'left' ? <ArrowLeft /> : <ArrowRight />}</div>
    </button>
  );
}
