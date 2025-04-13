import { Meta, StoryObj } from '@storybook/react';

import MessageCard from '../app/post/_components/MessageCard';

const meta = {
  title: 'Components/MessageCard',
  component: MessageCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MessageCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: {
      id: 1,
      content: '기본 메시지입니다.',
      createdAt: new Date(),
      sender: '홍길동',
      profileImageURL: 'https://placehold.co/40',
      relationship: '친구',
      recipientId: 0,
      backgroundColor: null,
      font: 'Noto Sans',
    },
  },

  render: (args) => {
    return (
      <div style={{ width: '100%', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MessageCard {...args} />
      </div>
    );
  },
};
