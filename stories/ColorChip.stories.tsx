import { COLORCHIP_COLORS } from '@constants/COLORS';

import ColorChip from '@components/ColorChip/ColorChip';
import ColorChipList from '@components/ColorChip/ColorChipList';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ColorChip> = {
  title: 'Atoms/ColorChip',
  component: ColorChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColorChip>;

export const Default: Story = {
  args: {
    color: 'beige',
    chosenColor: null,
    onClickColor: () => {},
    index: 0,
  },
};

export const Selected: Story = {
  args: {
    color: 'beige',
    chosenColor: 0,
    onClickColor: () => {},
    index: 0,
  },
};

export const List: Story = {
  render: () => <ColorChipList colorOptions={COLORCHIP_COLORS} chosenIndex={0} handleClickItem={() => {}} />,
};
