import { Meta, StoryObj } from '@storybook/react';

import MenuList from '@components/MenuList';

const meta = {
  title: 'Components/MenuList',
  component: MenuList,
  parameters: {
    layout: 'centered',
  },

  args: {
    menuList: [
      { label: 'Menu 1', onClick: () => console.log('menu1') },
      { label: 'Menu 2', onClick: () => console.log('menu2') },
      { label: 'Menu 3', onClick: () => console.log('menu3') },
    ],
  },
} satisfies Meta<typeof MenuList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
