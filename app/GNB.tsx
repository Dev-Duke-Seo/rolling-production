'use client';

import classNames from 'classnames/bind';
import { usePathname, useRouter } from 'next/navigation';

import LogoIcon from '@icons/logo-icon.svg?component';

import Button from '@components/Buttons/Button';

import { usePathConfig } from '@hooks/usePathConfigs';

import styles from './GNB.module.scss';

const cn = classNames.bind(styles);

export default function GNB() {
  const router = useRouter();

  return (
    <nav className={cn('gnb')}>
      <div className={cn('gnb-container')}>
        <button type='button' className={cn('logo')} onClick={() => router.push('/')}>
          <LogoIcon />
          <h1>Rolling</h1>
        </button>
        <div className={cn('route-button')}>
          <RouteButton />
        </div>
      </div>
    </nav>
  );
}

function RouteButton() {
  const router = useRouter();
  const currentPath = usePathname();

  const { config } = usePathConfig(currentPath);

  if (!config.show) {
    return null;
  }

  return (
    <Button type={'outlined'} size={40} handleClickButton={() => router.push(config.linkTo)}>
      {config.text}
    </Button>
  );
}
