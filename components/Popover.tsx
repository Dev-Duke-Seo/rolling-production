'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

import styles from './Popover.module.scss';

interface PopoverProps {
  popoverRef: React.RefObject<HTMLDivElement>;
  setIsPopoverOpen: (isOpen: boolean) => void;
  isPopoverOpen: boolean;
  verticalPadding?: number;
  horizontalPadding?: number;
}

export default function Popover({
  children,
  popoverRef,
  setIsPopoverOpen,
  isPopoverOpen,
  verticalPadding = 0,
  horizontalPadding = 0,
}: PropsWithChildren<PopoverProps>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [_, setPopoverWidth] = useState(0);

  const handleClickOutsideWrapper = (e: MouseEvent) => {
    // e.target이 실제 어떤 요소인지 확인

    if (popoverRef.current) {
      // composedPath()를 사용해 이벤트 경로 전체를 확인
      const clickPath = e.composedPath();
      const isInside = clickPath.includes(popoverRef.current);

      if (!isInside) {
        setIsPopoverOpen(false);
      }
    }
  };

  const handleClickWrapper = (e: MouseEvent) => {
    // composedPath()를 사용해 이벤트 경로 전체를 확인
    if (popoverRef.current) {
      const clickPath = e.composedPath();
      const isInside = clickPath.includes(popoverRef.current);

      if (isInside) {
        return;
      }
    }

    // 팝오버가 닫혀있을 때는 ref 체크 없이 바로 위치 계산
    const screenWidth = window.innerWidth;
    const x = e.clientX;
    const y = e.clientY;
    const isLeft = x < screenWidth / 2;

    const popoverElement = popoverRef.current;

    if (popoverElement) {
      const popoverRect = popoverElement.getBoundingClientRect();
      setPopoverWidth(popoverRect.width);
      setPosition({ x: isLeft ? x : x - popoverRect.width, y });
    } else {
      setPosition({ x: isLeft ? x : x - 200, y }); // fallback if ref is not available
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickWrapper);
    document.addEventListener('mousedown', handleClickOutsideWrapper);

    return () => {
      document.removeEventListener('click', handleClickWrapper);
      document.removeEventListener('mousedown', handleClickOutsideWrapper);
    };
  }, [popoverRef]);

  useEffect(() => {}, []);

  return (
    isPopoverOpen && (
      <div
        className={styles.popover}
        ref={popoverRef}
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          padding: `${verticalPadding}rem ${horizontalPadding}rem`,
        }}
      >
        {children}
      </div>
    )
  );
}
