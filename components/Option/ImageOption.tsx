import React from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import { UrlString } from '@apis/types/Recipient';

import CheckIcon from '@components/CheckIcon';

import styles from './ImageOption.module.scss';

const cx = classNames.bind(styles);

interface ImageOptionProps {
  chosenIndex: number | null;
  handleClickItem: (index: number) => void;
  imageUrls: UrlString[];
}

export function ImageOption({ chosenIndex, handleClickItem, imageUrls = [] }: ImageOptionProps) {
  return (
    <ol className={cx('image-option')}>
      {imageUrls?.map((url, index) => (
        <ImageOptionItem
          key={url}
          url={url}
          isChosen={chosenIndex === index}
          handleClickItem={handleClickItem}
          index={index}
        />
      ))}
    </ol>
  );
}

interface ImageOptionItemProps {
  url: string;
  isChosen: boolean;
  handleClickItem: (index: number) => void;
  index: number | null;
}

function ImageOptionItem({ url, isChosen, handleClickItem, index = null }: ImageOptionItemProps) {
  const handleClick = () => {
    handleClickItem(index!);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <li className={cx('image-option-item')} onClick={handleClick}>
      <Image className={cx('src')} src={url} fill alt={'image-option'} />
      {isChosen && <CheckIcon />}
      <Backdrop isChosen={isChosen} />
    </li>
  );
}

interface BackdropProps {
  isChosen?: boolean;
}

function Backdrop({ isChosen = false }: BackdropProps) {
  return <div className={cx('backdrop', isChosen && 'selected')} />;
}
