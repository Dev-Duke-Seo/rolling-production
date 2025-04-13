import { Meta, StoryObj } from '@storybook/react';

import GNB from '@/app/GNB';

const meta = {
  title: 'Components/GNB',
  component: GNB,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GNB>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PC: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
