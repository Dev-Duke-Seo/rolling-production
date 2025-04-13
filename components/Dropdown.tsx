import classNames from 'classnames/bind';
import Image from 'next/image';

import { FormType } from '@components/Input';
import MenuList from '@components/MenuList';

import { useDropdown } from '@hooks/useDropdown';

import styles from './Dropdown.module.scss';

const cx = classNames.bind(styles);

interface DropdownProps {
  status: FormType;
  error?: boolean;
  list: string[];
  placeholder?: string;
  selectedItem?: string | null;
  onSelect?: (item: string) => void;
}

export default function Dropdown({
  status = 'active',
  error = false,
  list,
  placeholder = '선택해주세요',
  selectedItem,
  onSelect,
}: DropdownProps) {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

  const handleSelect = (item: string) => {
    if (onSelect) {
      onSelect(item);
    }

    toggleDropdown();
  };

  return (
    <div className={cx('dropdown-container')} ref={dropdownRef}>
      <button type='button' className={cx('dropdown-button', status, { error })} onClick={toggleDropdown}>
        <span>{selectedItem || placeholder}</span>
        <Image
          className={cx('dropdown-arrow')}
          src={isOpen ? '/icons/arrow_top.svg' : '/icons/arrow_down.svg'}
          alt='dropdown arrow'
          width={16}
          height={16}
        />
      </button>

      {isOpen && (
        <div className={cx('dropdown-content')}>
          <MenuList menuList={list.map((item) => ({ label: item, value: item, onClick: () => handleSelect(item) }))} />
        </div>
      )}

      {error && <p className={cx('error-message')}>error message</p>}
    </div>
  );
}
