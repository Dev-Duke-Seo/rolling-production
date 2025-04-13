import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Input from '@components/Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    type: 'active',
    placeholder: 'Example',
    error: {},
    registerLabel: 'example',
    register: fn(),
    required: false,
  },
};

const commonArgs = {
  type: 'active',
  placeholder: 'Error Example',
  register: fn(),
  registerLabel: 'errorExample',
};

export const Errors = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Input {...commonArgs} type='active' error={{ errorExample: { type: 'REQUIRED' } }} />
      <Input {...commonArgs} type='active' error={{ errorExample: { type: 'MAX_LENGTH' } }} />
      <Input {...commonArgs} type='active' error={{ errorExample: { type: 'INVALID_PATTERN' } }} />
      <Input {...commonArgs} type='active' error={{ errorExample: { type: 'INVALID_VALUE' } }} />
      <Input {...commonArgs} type='active' error={{ errorExample: { type: 'MIN_LENGTH' } }} />
      <Input {...commonArgs} type='active' error={{ errorExample: { type: 'REQUIRED_INDEX' } }} />
    </div>
  );
};
