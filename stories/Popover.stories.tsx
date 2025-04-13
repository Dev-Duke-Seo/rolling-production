import React, { useRef, useState } from 'react';

import { Meta } from '@storybook/react';

import Popover from '@/components/Popover';

import Button from '@components/Buttons/Button';
import Explanation from '@components/Tab/Explanation';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Popover>;

export default meta;

export const PopoverExample = () => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isLeftPopoverOpen, setIsLeftPopoverOpen] = useState(false);
  const [isRightPopoverOpen, setIsRightPopoverOpen] = useState(false);

  return (
    <>
      <Explanation>
        <h3>화면 중앙을 기준으로 팝오버가 열리는 방향이 결정됩니다.</h3>
      </Explanation>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          gap: '10rem',
        }}
      >
        <Button handleClickButton={() => setIsLeftPopoverOpen(true)}>왼쪽 팝오버 열기</Button>
        <Popover
          popoverRef={popoverRef}
          isPopoverOpen={isLeftPopoverOpen}
          setIsPopoverOpen={setIsLeftPopoverOpen}
          verticalPadding={2}
          horizontalPadding={3}
        >
          <h3>팝오버가 열렸습니다. 영역 바깥을 클릭하면 닫힙니다.</h3>
        </Popover>
        <Button handleClickButton={() => setIsRightPopoverOpen(true)}>오른쪽 팝오버 열기</Button>
        <Popover
          popoverRef={popoverRef}
          isPopoverOpen={isRightPopoverOpen}
          setIsPopoverOpen={setIsRightPopoverOpen}
          verticalPadding={2}
          horizontalPadding={3}
        >
          <h3>팝오버가 열렸습니다. 영역 바깥을 클릭하면 닫힙니다.</h3>
        </Popover>
      </div>
    </>
  );
};
