import { Metadata } from 'next';

import PostByIdPage from '../page';

export const metadata: Metadata = {
  title: 'Edit Post',
  description: 'Edit your post',
};

export default async function EditPage({ params }: { params: { id: string } }) {
  return <PostByIdPage isEditMode params={{ id: params.id }} />;
}
