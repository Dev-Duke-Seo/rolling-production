import { forwardRef, MutableRefObject, PropsWithChildren } from 'react';

import classNames from 'classnames/bind';

import styles from './Label.module.scss';

const cx = classNames.bind(styles);

export default function Label({ children }: PropsWithChildren) {
  return <h2 className={cx('label')}>{children}</h2>;
}

interface ComponentWithLabelProps<T> {
  label: string;
  [key: string]: any;
  ref: MutableRefObject<T>;
}

export function withLabel<T>(Component: any) {
  return forwardRef(function ComponentWithLabel(
    { label, ...props }: Omit<ComponentWithLabelProps<T>, 'ref'>,
    ref: React.ForwardedRef<T>,
  ) {
    return (
      <div className={cx('with-label')}>
        <Label>{label}</Label>
        <Component {...props} ref={ref} />
      </div>
    );
  });
}
