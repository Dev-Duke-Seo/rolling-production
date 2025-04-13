'use client';

import { PropsWithChildren } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@components/Buttons/Button';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

interface PointArticleProps {
  pointNumber: string;
  subExplanation: string;
}

export default function Home() {
  const router = useRouter();

  const moveToList = () => {
    router.push('/list');
  };

  return (
    <main className={cx('home')}>
      <section className={cx('article-section')}>
        <article className={cx('point-article-container', 'top')}>
          <PointArticle pointNumber='Point. 01' subExplanation='로그인 없이 자유롭게 만들어요.'>
            <>
              누구나 손쉽게,
              <br className={cx('break-line')} /> 롤링 페이퍼를 만들 수 있어요.
            </>
          </PointArticle>
          <Image
            className={cx('point-image')}
            src='/images/main-top.png'
            alt='point-1'
            width={0}
            height={0}
            sizes='100vw'
            priority
          />
        </article>
        <article className={cx('point-article-container', 'bottom')}>
          <PointArticle pointNumber='Point. 02' subExplanation='롤링 페이퍼에 이모지를 추가할 수 있어요'>
            서로에게 이모지로 감정을 표현해보세요.
          </PointArticle>
          <Image
            className={cx('point-image')}
            src='/images/main-bottom.png'
            alt='point-2'
            width={0}
            height={0}
            sizes='100vw'
            priority
          />
        </article>
      </section>

      <Button type='primary' size={56} handleClickButton={moveToList}>
        구경해보기
      </Button>
    </main>
  );
}

function PointArticle({ pointNumber, subExplanation, children }: PropsWithChildren<PointArticleProps>) {
  return (
    <article className={cx('point-article')}>
      <div className={cx('point-number')}>{pointNumber}</div>
      <div className={cx('explanation-container')}>
        <p className={cx('explanation')}>{children}</p>
        <p className={cx('sub-explanation')}>{subExplanation}</p>
      </div>
    </article>
  );
}
