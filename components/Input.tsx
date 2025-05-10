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

// ref 로직을 별도 훅으로 추출하는 것이 이상적
function useInputRef(register: UseFormReturn['register'], registerLabel: string) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setRefs = (element: HTMLInputElement | null) => {
    if (register && registerLabel) {
      const registered = register(registerLabel);

      if (registered && registered.ref) {
        registered.ref(element);
      }
    }

    inputRef.current = element;
  };

  return { inputRef, setRefs };
}

// 오류 메시지 컴포넌트 분리
function ErrorMessage({
  error,
  registerLabel,
}: {
  error: UseFormReturn['formState']['errors'];
  registerLabel: string;
}) {
  if (!error[registerLabel] || !error[registerLabel].type) {
    return null;
  }

  return <p>{FORM_ERROR_MESSAGES[error[registerLabel].type as keyof typeof FORM_ERROR_MESSAGES]}</p>;
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
  const { inputRef, setRefs } = useInputRef(register, registerLabel);

  useEffect(() => {
    // error가 있을 때만 input에 포커스를 유지
    if (inputRef.current && error[registerLabel]) {
      inputRef.current.focus();
    }
  }, [error, registerLabel, inputRef]);

  const isDisabled = type === 'disabled';
  const hasError = Boolean(error[registerLabel]);

  return (
    <div className={cx('input-box')}>
      <input
        className={cx('input', type, { fullSize }, { error: hasError })}
        placeholder={placeholder}
        disabled={isDisabled}
        {...register(registerLabel, { required })}
        ref={setRefs}
      />
      <ErrorMessage error={error} registerLabel={registerLabel} />
    </div>
  );
}
