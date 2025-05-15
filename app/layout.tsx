import '@styles/global-styles/global.scss';
import { Metadata } from 'next';

import GNB from '@/app/GNB';
import { QueryProvider } from '@queries/QueryProvider';

import ToastContainer from '@components/Toast/ToastContainer';

export const metadata: Metadata = {
  title: 'Rolling: 몰래 남기는 편지',
  description: '몰래 남기는 편지',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        {/* 외부 이미지 도메인 프리커넥트 최적화 */}
        <link rel='preconnect' href='https://picsum.photos' crossOrigin='anonymous' />
        <link rel='dns-prefetch' href='https://picsum.photos' />
      </head>
      <body id='root'>
        <QueryProvider>
          <GNB />
          <div id='page'>{children}</div>
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
