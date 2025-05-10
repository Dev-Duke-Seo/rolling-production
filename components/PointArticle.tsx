import { PropsWithChildren } from 'react';

import classNames from 'classnames/bind';

import styles from './PointArticle.module.scss';

const cx = classNames.bind(styles);

interface PointArticleProps {
  pointNumber: string;
  subExplanation: string;
}

export function PointArticle({ pointNumber, subExplanation, children }: PropsWithChildren<PointArticleProps>) {
  return (
    <article className={cx('point-article')}>
      <div className={cx('point-number')}>{pointNumber}</div>
      <div className={cx('explanation-container')}>
        <p className={cx('explanation')}>{children}</p>
        <p className={cx('sub-explanation')}>{subExplanation}</p>
      </div>
    </article>
  );
}
