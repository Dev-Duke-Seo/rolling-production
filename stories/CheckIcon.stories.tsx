import { Meta, StoryObj } from '@storybook/react';

import CheckIcon from '@components/CheckIcon';

const meta: Meta<typeof CheckIcon> = {
  title: 'Atoms/Icons/CheckIcon',
  component: CheckIcon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CheckIcon>;

export const Default: Story = {
  args: {},
};
