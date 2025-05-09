'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@components/Buttons/Button';
import { PointArticle } from '@components/PointArticle';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

// 이미지 자동 크기 조정을 위한 상수
const AUTO_SIZE = 0;

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
            width={AUTO_SIZE}
            height={AUTO_SIZE}
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
            width={AUTO_SIZE}
            height={AUTO_SIZE}
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
