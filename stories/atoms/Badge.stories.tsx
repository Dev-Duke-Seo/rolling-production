import { Meta, StoryObj } from '@storybook/react';

import Badge from '@components/Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ChooseRelationship: Story = {
  args: {
    relationship: '지인',
  },
};

export const AllBadges = () => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Badge relationship='지인' />
      <Badge relationship='동료' />
      <Badge relationship='가족' />
      <Badge relationship='친구' />
    </div>
  );
};
