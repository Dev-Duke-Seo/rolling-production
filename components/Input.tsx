import { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

import classNames from 'classnames/bind';

import { FORM_ERROR_MESSAGES } from '@constants/Errors';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

export type FormType = 'active' | 'inactive' | 'disabled';

interface InputProps {
  fullSize?: boolean;
  placeholder: string;
  register: UseFormReturn['register'];
  registerLabel: string;
  type?: FormType;
  error: UseFormReturn['formState']['errors'];
  required?: boolean;
}

export default function Input({
  placeholder,
  type = 'active',
  fullSize = false,
  register,
  registerLabel,
  error,
  required = false,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // error가 있을 때만 input에 포커스를 유지
    if (inputRef.current && error[registerLabel]) {
      inputRef.current!.focus();
    }
  }, [error, registerLabel]);

  return (
    <div className={cx('input-box')}>
      <input
        className={cx('input', type, { fullSize }, { error: error![registerLabel] })}
        placeholder={placeholder}
        disabled={type === 'disabled'}
        {...register(registerLabel, { required })}
        ref={(e) => {
          if (register && registerLabel) {
            const registered = register(registerLabel);

            if (registered && registered.ref) {
              registered.ref(e);
            }
          }

          inputRef.current = e;
        }}
      />
      {error[registerLabel] && error[registerLabel].type && (
        <p>{FORM_ERROR_MESSAGES[error[registerLabel].type as keyof typeof FORM_ERROR_MESSAGES]}</p>
      )}
    </div>
  );
}
