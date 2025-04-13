import { Meta, StoryObj } from '@storybook/react';

import CardModal from '@components/Modals/CardModal';

const meta = {
  title: 'Components/CardModal',
  component: CardModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CardModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: {
      id: 10067,
      content: '안녕하세요 카드 모달입니다.',
      recipientId: 10067,
      sender: '홍길동',
      profileImageURL: 'https://placehold.co/150',
      backgroundColor: 'beige',
      createdAt: new Date('2021-01-01'),
      relationship: '지인',
      font: '나눔명조',
    },
    handleClickClose: () => {},
  },
  render: (args) => {
    return (
      <div style={{ width: '100rem', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardModal {...args} />
      </div>
    );
  },
};
