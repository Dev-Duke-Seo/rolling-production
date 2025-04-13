'use client';

import React from 'react';

import classNames from 'classnames/bind';

import { ColorchipColors } from '@constants/COLORS';

import ColorChip from './ColorChip';
import styles from './ColorChipList.module.scss';

const cx = classNames.bind(styles);

interface ColorChipListProps {
  colorOptions: ColorchipColors[];
  chosenIndex: number | null;
  handleClickItem: (index: number) => void;
}

export default function ColorChipList({ colorOptions, chosenIndex, handleClickItem }: ColorChipListProps) {
  return (
    <ul className={cx('color-chip-list')}>
      {colorOptions.map((color, index) => (
        <ColorChip
          color={color}
          key={color}
          index={index}
          chosenColor={chosenIndex}
          onClickColor={() => handleClickItem(index)}
        />
      ))}
    </ul>
  );
}
