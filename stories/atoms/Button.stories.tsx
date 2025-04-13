import { Meta, StoryObj } from '@storybook/react';

import Button from '@components/Buttons/Button';
import Label from '@components/Label';

const meta = {
  title: 'Atoms/Buttons/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ChooseProps: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    type: 'primary',
    children: 'Choose Props',
  },
};

export const Disabled: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    type: 'primary',
    children: 'Disabled',
    disabled: true,
  },
};

export const AllButtons: Story = {
  render: () => (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Label>Primary</Label>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <Button type='primary' size={56}>
              Enabled
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <Label>Secondary</Label>
            <Button type='secondary' size={56}>
              Enabled
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Label>Outlined</Label>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <Button type='outlined' size={56}>
              Enabled
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Label>Disabled</Label>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <Button type='outlined' size={56} disabled>
              Disabled
            </Button>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div>
          <Label>Size 56</Label>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <Button type='primary' size={56}>
              Enabled
            </Button>
            <Button type='secondary' size={56}>
              Enabled
            </Button>
            <Button type='outlined' size={56}>
              Enabled
            </Button>
          </div>
        </div>
        <div>
          <Label>Size 40</Label>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <Button type='primary' size={40}>
              Enabled
            </Button>
            <Button type='secondary' size={40}>
              Enabled
            </Button>
            <Button type='outlined' size={40}>
              Enabled
            </Button>
          </div>
        </div>
        <div>
          <Label>Size 36</Label>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <Button type='primary' size={36}>
              Enabled
            </Button>
            <Button type='secondary' size={36}>
              Enabled
            </Button>
            <Button type='outlined' size={36}>
              Enabled
            </Button>
          </div>
        </div>
        <div>
          <Label>Size 28</Label>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <Button type='primary' size={28}>
              Enabled
            </Button>
            <Button type='secondary' size={28}>
              Enabled
            </Button>
            <Button type='outlined' size={28}>
              Enabled
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
};
