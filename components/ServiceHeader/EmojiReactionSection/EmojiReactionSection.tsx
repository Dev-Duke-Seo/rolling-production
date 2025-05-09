import React from 'react';

import classNames from 'classnames/bind';

import EmojiIconComponent from '@icons/add-24.svg?component';
import ArrowIcon from '@icons/arrow_down.svg?component';

import Button from '@components/Buttons/Button';
import Popover from '@components/Popover';

import { usePopover } from '@hooks/usePopover';

import styles from './EmojiReactionSection.module.scss';
import EmojiList from '../EmojiService/EmojiList';
import EmojiService from '../EmojiService/EmojiService';

const cx = classNames.bind(styles);

// EmojiListToggle 컴포넌트 분리
const EmojiListToggle = ({ recipientId }: { recipientId: number }) => {
  const {
    togglePopover: toggleEmojiList,
    popoverRef: emojiListRef,
    togglePopover: setOpenEmojiList,
    isPopoverOpen: isEmojiListOpen,
  } = usePopover();

  return (
    <div className={cx('emoji-service')}>
      <EmojiList recipientId={recipientId} gridColumns={3} displayLimit={3} />
      <button type='button' onClick={toggleEmojiList} className={cx('arrow-button')}>
        <ArrowIcon />
      </button>
      <Popover
        popoverRef={emojiListRef}
        setIsPopoverOpen={setOpenEmojiList}
        isPopoverOpen={isEmojiListOpen}
        verticalPadding={2.4}
        horizontalPadding={2.4}
      >
        <EmojiList recipientId={recipientId} gridColumns={3} />
      </Popover>
    </div>
  );
};

// AddEmojiButton 컴포넌트 분리
const AddEmojiButton = ({ recipientId }: { recipientId: number }) => {
  const {
    togglePopover: toggleAddEmoji,
    popoverRef: addEmojiRef,
    togglePopover: setOpenAddEmoji,
    isPopoverOpen: isAddEmojiOpen,
  } = usePopover();

  return (
    <div className={cx('buttons')}>
      <Button type={'outlined'} size={36} handleClickButton={toggleAddEmoji}>
        <EmojiIconComponent /> <span className={cx('add-emoji-text')}>추가</span>
      </Button>
      <Popover popoverRef={addEmojiRef} setIsPopoverOpen={setOpenAddEmoji} isPopoverOpen={isAddEmojiOpen}>
        <EmojiService recipientId={recipientId} />
      </Popover>
    </div>
  );
};

interface EmojiReactionSectionProps {
  recipientId: number;
}

export default function EmojiReactionSection({ recipientId }: EmojiReactionSectionProps) {
  return (
    <div className={cx('emoji-reaction-section')}>
      <EmojiListToggle recipientId={recipientId} />
      <AddEmojiButton recipientId={recipientId} />
    </div>
  );
}
