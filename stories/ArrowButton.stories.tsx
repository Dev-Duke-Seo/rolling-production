import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fn } from '@storybook/test';

import ArrowButton from '@components/Buttons/ArrowButton';

const meta: Meta<typeof ArrowButton> = {
  title: 'Atoms/Buttons/ArrowButton',
  component: ArrowButton,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

export const LeftAndRight = () => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <ArrowButton direction='left' onClick={fn()} />
      <ArrowButton direction='right' onClick={fn()} />
    </div>
  );
};
