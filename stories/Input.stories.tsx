import React from 'react';
import { useForm } from 'react-hook-form';

import { Meta, StoryObj } from '@storybook/react';

import Input from '@components/Input';

const InputWithForm = (args: any) => {
  const methods = useForm();

  return <Input {...args} register={methods.register} error={methods.formState.errors} />;
};

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: InputWithForm,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['active', 'inactive', 'disabled'],
    },
    fullSize: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '입력해주세요',
    registerLabel: 'input',
    type: 'active',
    fullSize: false,
    required: false,
  },
};

export const Inactive: Story = {
  args: {
    placeholder: '비활성 입력',
    registerLabel: 'inactive',
    type: 'inactive',
    fullSize: false,
    required: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화됨',
    registerLabel: 'disabled',
    type: 'disabled',
    fullSize: false,
    required: false,
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: '전체 너비',
    registerLabel: 'fullWidth',
    type: 'active',
    fullSize: true,
    required: false,
  },
};
