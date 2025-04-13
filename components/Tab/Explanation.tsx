import { PropsWithChildren } from 'react';

import classNames from 'classnames/bind';

import styles from './Explanation.module.scss';

const cx = classNames.bind(styles);

export default function Explanation({ children }: PropsWithChildren) {
  return <h2 className={cx('explanation')}>{children}</h2>;
}
