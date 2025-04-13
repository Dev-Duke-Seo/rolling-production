import classNames from 'classnames/bind';

import styles from './MenuList.module.scss';

const cx = classNames.bind(styles);

type MenuItem = {
  label: string;
  onClick: () => void;
};

interface MenuListProps {
  menuList: MenuItem[];
}

export default function MenuList({ menuList }: MenuListProps) {
  return (
    <ul className={cx('menu-list')}>
      {menuList.map((menu, index) => (
        <li
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={menu.onClick}
          role='presentation'
        >
          {menu.label}
        </li>
      ))}
    </ul>
  );
}
