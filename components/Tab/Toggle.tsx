'use client';

import classNames from 'classnames/bind';

import styles from './Toggle.module.scss';

const cx = classNames.bind(styles);

interface ToggleProps {
  toggleItems: string[];
  activeTab: string | null;
  handleChangeTab: (label: string) => void;
}

export default function Toggle({ toggleItems, activeTab, handleChangeTab }: ToggleProps) {
  return (
    <ul className={cx('toggle')}>
      {toggleItems.map((item) => (
        <ToggleButton key={item} isActive={activeTab === item} handleChangeTab={handleChangeTab}>
          {item}
        </ToggleButton>
      ))}
    </ul>
  );
}

export interface ToggleItemProps {
  isActive?: boolean;
  handleChangeTab: (label: string) => void;
  children: string;
}

function ToggleButton({ isActive = false, handleChangeTab, children }: ToggleItemProps) {
  const onClick = () => {
    handleChangeTab(children);
  };

  return (
    <li className={cx('toggle-button', { active: isActive })} onClick={onClick} role='presentation'>
      <p>{children}</p>
    </li>
  );
}
