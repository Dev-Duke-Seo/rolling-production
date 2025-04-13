import React from 'react';

import { Meta } from '@storybook/react';

import Explanation from '@/components/Tab/Explanation';

const meta = {
  title: 'Atoms/Explanation',
  component: Explanation,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Explanation>;

export default meta;

export const Default = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Explanation>이것은 Explanation 컴포넌트입니다</Explanation>
      <Explanation>탭 컴포넌트의 설명을 표시하는데 사용됩니다</Explanation>
    </div>
  );
};
