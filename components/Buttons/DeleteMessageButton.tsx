'use client';

import classNames from 'classnames/bind';

import DeleteIcon from '@public/icons/deleted.svg?component';
import { useDeleteMessage } from '@queries/useMessageQueries';

import styles from './DeleteMessageButton.module.scss';

const cn = classNames.bind(styles);

export default function DeleteMessageButton({ cardId }: { cardId: number }) {
  const { mutateAsync } = useDeleteMessage(cardId);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className={cn('delete-message-button')}
      type='button'
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDelete(e)}
    >
      <DeleteIcon className={cn('delete-message-button-icon')} />
    </button>
  );
}
