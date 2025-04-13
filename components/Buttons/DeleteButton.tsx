'use client';

import { useRouter } from 'next/navigation';

import { useDeleteRecipient } from '@queries/useRecipientQueries';

import Button from '@components/Buttons/Button';

export default function DeleteRecipientButton({ recipientId }: { recipientId: number }) {
  const router = useRouter();

  const { mutateAsync } = useDeleteRecipient(recipientId);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await mutateAsync();
    router.push('/list');
  };

  return (
    <Button type='primary' size={36} handleClickButton={(e: React.MouseEvent<HTMLButtonElement>) => handleDelete(e)}>
      삭제하기
    </Button>
  );
}
