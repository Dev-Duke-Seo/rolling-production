'use client';

import classNames from 'classnames/bind';
import { usePathname, useRouter } from 'next/navigation';

import LogoIcon from '@icons/logo-icon.svg?component';

import Button from '@components/Buttons/Button';

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

  // 경로별 버튼 설정을 객체로 정의
  type PathConfig = {
    text: string;
    linkTo: string;
    show: boolean;
  };

  type PathString = `/${string}` | 'NO_SHOW_PATH';

  const PATH_CONFIG: Record<PathString, PathConfig> = {
    '/': {
      text: '롤링페이퍼 구경하기',
      linkTo: '/list',
      show: true,
    },
    '/list': {
      text: '롤링페이퍼 만들기',
      linkTo: '/post',
      show: true,
    },
    // 정규식으로 처리하던 경로들을 명시적으로 정의
    NO_SHOW_PATH: {
      text: '',
      linkTo: '',
      show: false,
    },
  };

  const NO_SHOW_PATH_MATCHER: RegExp[] = [/^\/post.*/];

  // 현재 경로에 맞는 설정 가져오기 또는 기본값 사용
  const getPathConfig = () => {
    const pathKey = currentPath as keyof typeof PATH_CONFIG;

    // 정확한 경로 매칭 먼저 시도
    if (PATH_CONFIG[pathKey]) {
      return PATH_CONFIG[pathKey];
    }

    // 정확한 매칭이 없으면 패턴 매칭 시도
    for (const matcher of NO_SHOW_PATH_MATCHER) {
      if (matcher.test(currentPath)) {
        return PATH_CONFIG.NO_SHOW_PATH;
      }
    }

    // 해당사항 없을시 기본값 반환
    return PATH_CONFIG['/'];
  };

  const config = getPathConfig();

  // 버튼을 표시하지 않아야 하는 경우
  if (!config.show) {
    return null;
  }

  return (
    <Button type={'outlined'} size={40} handleClickButton={() => router.push(config.linkTo)}>
      {config.text}
    </Button>
  );
}
