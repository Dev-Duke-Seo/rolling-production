import classNames from 'classnames/bind';
import Link from 'next/link';

import PlusIcon from '@public/icons/plus.svg?component';

import styles from './MessageCard.module.scss';

const cx = classNames.bind(styles);

export default function AddMessageCard({ id }: { id: string }) {
  return (
    <Link className={cx('message-card', 'add')} href={`/post/${id}/message`} role='presentation'>
      <div className={cx('icon')}>
        <PlusIcon />
      </div>
    </Link>
  );
}
