import { Meta, StoryObj } from '@storybook/react';

import ServiceHeader from '@components/ServiceHeader/ServiceHeader';

const meta = {
  title: 'Components/ServiceHeader',
  component: ServiceHeader,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ServiceHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '서비스 제목',
    messageCount: 10,
    profileImages: ['https://placehold.co/150', 'https://placehold.co/150', 'https://placehold.co/150'],
    recipientId: 9289,
  },
  render: (args) => {
    return (
      <div style={{ width: '100rem', height: '50vh' }}>
        <ServiceHeader {...args} />
      </div>
    );
  },
};
