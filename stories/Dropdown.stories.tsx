import { Meta, StoryObj } from '@storybook/react';

import Dropdown from '@components/Dropdown';

import useSelect from '@hooks/ui/useSelect';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'active',
    list: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: '선택해주세요',
  },
  render: (args) => {
    const { selectedOption, select } = useSelect();

    return <Dropdown {...args} selectedItem={selectedOption} onSelect={select} />;
  },
};
