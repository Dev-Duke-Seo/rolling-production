import { memo } from 'react';

import classNames from 'classnames/bind';

import { ColorchipColors } from '@constants/COLORS';

import CheckIcon from '@components/CheckIcon';

import styles from './ColorChip.module.scss';

const cx = classNames.bind(styles);

interface ColorChipProps {
  color: ColorchipColors;
  chosenColor?: number | null;
  onClickColor: (index: number | null) => void;
  index: number | null;
}

function ColorChip({ color = 'beige', chosenColor, onClickColor, index = null }: ColorChipProps) {
  const handleClick = () => {
    onClickColor(index);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li className={cx('color-chip', color)} onClick={handleClick}>
      {chosenColor === index && <CheckIcon />}
      <Backdrop />
    </li>
  );
}

export default memo(ColorChip);

function Backdrop() {
  return <div className={cx('backdrop')} />;
}
