/**
 * 글로벌 타입 선언
 */

/**
 * 환경 변수 타입 확장
 */
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    RECIPIENT_TEST_ID?: string;
    MESSAGE_TEST_ID?: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

/**
 * 클라이언트 스토리지 키 타입
 */
declare type StorageKey = 'emoji-storage' | 'theme-preference' | 'user-settings' | 'recent-searches';

/**
 * 이미지 타입 확장
 */
declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react';

  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

declare module '*.svg?component' {
  import { ReactElement, SVGProps } from 'react';

  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

/**
 * Window 객체 확장
 */
interface Window {
  dataLayer?: any[];
  gtag?: (...args: any[]) => void;
}
