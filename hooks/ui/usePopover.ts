import { useRef, useState } from 'react';

interface UsePopover {
  isPopoverOpen: boolean;
  togglePopover: () => void;
  popoverRef: React.MutableRefObject<null>;
  closePopover: () => void;
}

export function usePopover(): UsePopover {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
    console.log('toggled');
  };

  const closePopover = () => setIsPopoverOpen(false);

  return { isPopoverOpen, togglePopover, popoverRef, closePopover };
}
