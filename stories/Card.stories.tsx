import { Meta, StoryObj } from '@storybook/react';

import Card from '@/app/list/_components/Card/Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ChooseColor: Story = {
  args: {
    backgroundImageURL: null,
    backgroundColor: 'purple',
    name: '홍길동',
    id: 10067,
    messageCount: 0,
    recentMessages: [],
    reactionCount: 0,
    topReactions: [],
  },
};
