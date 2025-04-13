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
