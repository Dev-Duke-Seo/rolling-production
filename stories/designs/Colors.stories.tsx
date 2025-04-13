import classNames from 'classnames/bind';

import Label from '@components/Label';

import styles from './Colors.module.scss';

import type { Meta } from '@storybook/react';

const cn = classNames.bind(styles);

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type ColorNumber = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

interface ColorBoxProps {
  color: string;
  number?: ColorNumber | string;
}

const ColorBox = ({ color, number }: ColorBoxProps) => (
  <div
    className={cn('color-box', `${color}-${number}`)}
    style={{ '--color': number ? `var(--${color}-${number})` : `var(--${color})` } as React.CSSProperties}
  >
    {number || color}
  </div>
);

interface ColorBoxesWithGradationProps {
  color: string;
  from?: ColorNumber;
  to?: ColorNumber;
}

const ColorBoxesWithGradation = ({ color, from, to }: ColorBoxesWithGradationProps) => {
  const colorBoxProps: ColorBoxProps[] = [];

  if (!from && !to) {
    return <ColorBox color={color} />;
  }

  if (!to) {
    to = 900;
  }

  if (!from) {
    from = 100;
  }

  for (let i = from; i <= to; i += 100) {
    colorBoxProps.push({ color, number: i });
  }

  return (
    <div className={cn('color-boxes')} style={{ display: 'flex' }}>
      {colorBoxProps.map(ColorBox)}
    </div>
  );
};

export const ColorPallets = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Label>Purple</Label>
    <ColorBoxesWithGradation color='purple' from={100} to={900} />
    <Label>Beige</Label>
    <ColorBoxesWithGradation color='beige' from={100} to={900} />
    <Label>Blue</Label>
    <ColorBoxesWithGradation color='blue' from={100} to={900} />
    <Label>Green</Label>
    <ColorBoxesWithGradation color='green' from={100} to={900} />
    <Label>Gray</Label>
    <ColorBoxesWithGradation color='gray' from={100} to={900} />
    <Label>ETC</Label>
    <div style={{ display: 'flex' }}>
      <ColorBox color='error' />
      <ColorBox color='surface' />
      <ColorBox color='white' />
      <div style={{ color: 'white' }}>
        <ColorBox color='black' />
      </div>
    </div>
  </div>
);
