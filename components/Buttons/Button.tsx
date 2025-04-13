import React, { PropsWithChildren } from 'react';

import classNames from 'classnames/bind';

import styles from './Button.module.scss';

// 버튼의 주요 컬러를 결정
type ButtonType = 'primary' | 'secondary' | 'outlined';

// 버튼의 상태는 서브 컬러를  결정.
type ButtonSize = 56 | 40 | 36 | 28 | 'full';

interface ButtonProps {
  handleClickButton?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
}

const cn = classNames.bind(styles);

function Button({
  children,
  handleClickButton,
  type = 'primary',
  size = 56,
  disabled = false,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn('button', `${type}`, `size-${size}`)}
      type={'button'}
      onClick={handleClickButton}
      disabled={disabled}
    >
      <div className={cn('button-content', `size-${size}`)}>{children}</div>
    </button>
  );
}

export default React.memo(Button);
