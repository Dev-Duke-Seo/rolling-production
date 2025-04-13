import { Meta, StoryObj } from '@storybook/react';

import ProfileImageList from '@components/ServiceHeader/ProfileImageList';

const meta = {
  title: 'Components/ProfileImageList',
  component: ProfileImageList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProfileImageList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ChooseType: Story = {
  args: {
    imageUrls: ['https://placehold.co/150', 'https://placehold.co/150', 'https://placehold.co/150'],
    selectionType: 'selection',
    onClick: () => {},
    messageCount: 10,
  },
};
