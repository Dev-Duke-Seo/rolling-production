import classNames from 'classnames/bind';

import Label from '@components/Label';

import styles from './Fonts.module.scss';

import type { Meta, StoryObj } from '@storybook/react';

const cn = classNames.bind(styles);

const meta = {
  title: 'Design System/Fonts',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FontPreview: Story = {
  render: () => (
    <div className={cn('font-preview')}>
      <div className={cn('row')}>
        <Label>Font / 28 Bold</Label>
        <p className={cn('font-28-bold')}>가나다라마바사아자차카타파하</p>
      </div>
      <div className={cn('row')}>
        <Label>Font / 24 Bold</Label>
        <p className={cn('font-24-bold')}>가나다라마바사아자차카타파하</p>
      </div>
      <div className={cn('row')}>
        <Label>Font / 24 Regular</Label>
        <p className={cn('font-24-regular')}>가나다라마바사아자차카타파하</p>
      </div>
      <div className={cn('row')}>
        <Label>Font / 20 Bold</Label>
        <p className={cn('font-20-bold')}>가나다라마바사아자차카타파하</p>
      </div>
      <div className={cn('row')}>
        <Label>Font / 20 Regular</Label>
        <p className={cn('font-20-regular')}>가나다라마바사아자차카타파하</p>
      </div>

      <div className={cn('row')}>
        <Label>Font / 18 Bold</Label>
        <p className={cn('font-18-bold')}>가나다라마바사아자차카타파하</p>
      </div>
      <div className={cn('row')}>
        <Label>Font / 18 Regular</Label>
        <p className={cn('font-18-regular')}>가나다라마바사아자차카타파하</p>
      </div>
      <div className={cn('row')}>
        <Label>Font / 16 Bold</Label>
        <p className={cn('font-16-bold')}>가나다라마바사아자차카타파하</p>
      </div>
      <div className={cn('row')}>
        <Label>Font / 16 Regular</Label>
        <p className={cn('font-16-regular')}>가나다라마바사아자차카타파하</p>
      </div>
      <div className={cn('row')}>
        <Label>Font / 15 Bold</Label>
        <p className={cn('font-15-bold')}>가나다라마바사아자차카타파하</p>
      </div>
      <div className={cn('row')}>
        <Label>Font / 15 Regular</Label>
        <p className={cn('font-15-regular')}>가나다라마바사아자차카타파하</p>
      </div>
      <div className={cn('row')}>
        <Label>Font / 14 Bold</Label>
        <p className={cn('font-14-bold')}>가나다라마바사아자차카타파하</p>
      </div>
      <div className={cn('row')}>
        <Label>Font / 14 Regular</Label>
        <p className={cn('font-14-regular')}>가나다라마바사아자차카타파하</p>
      </div>
    </div>
  ),
};
