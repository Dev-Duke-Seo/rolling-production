import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Meta, StoryObj } from '@storybook/react';

import Input from '@components/Input';
import Label, { withLabel } from '@components/Label';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: '라벨',
  },
};

// withLabel HOC 사용 예시를 위한 래퍼 컴포넌트
const InputWithForm = (args: any) => {
  const methods = useForm();

  return <Input {...args} register={methods.register} error={methods.formState.errors} />;
};

const LabeledInput = withLabel(InputWithForm);

export const WithLabelHOC: StoryObj<typeof LabeledInput> = {
  render: () => {
    const ref = useRef(null);

    return <LabeledInput label='WithLabelHOC' placeholder='입력해주세요' registerLabel='labeledInput' ref={ref} />;
  },
};
