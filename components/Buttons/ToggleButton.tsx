// 'use client';

// import { useState } from 'react';

// import classNames from 'classnames/bind';

// import ToggleButtonItem, { ToggleButtonItemProps } from '@components/ToggleButtonItem';

// import styles from './ToggleButton.module.scss';

// const cn = classNames.bind(styles);

// interface ToggleButtonProps {
//   items: Pick<ToggleButtonItemProps, 'buttonName'>[];
// }

// export default function ToggleButton({ items }: ToggleButtonProps) {
//   const [clickedItemIndex, setClickedItemIndex] = useState(0);
//   function handleClickToggleButton(index: number) {
//     setClickedItemIndex(index);
//   }

//   return (
//     <div className={cn('toggle-button')}>
//       {items.map((item, index) => (
//         <ToggleButtonItem
//           key={item.buttonName}
//           buttonName={item.buttonName}
//           index={index}
//           isSelected={index === clickedItemIndex}
//           handleClickToggleButton={() => handleClickToggleButton(index)}
//         />
//       ))}
//     </div>
//   );
// }
