'use client';

import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import classNames from 'classnames/bind';
import NextImage from 'next/image';
import Link from 'next/link';

import { Recipient, UrlString } from '@apis/types/Recipient';
import { ColorchipColors } from '@constants/COLORS';
import PatternBeige from '@icons/pattern-beige.svg?component';
import PatternBlue from '@icons/pattern-blue.svg?component';
import PatternGreen from '@icons/pattern-green.svg?component';
import PatternPurple from '@icons/pattern-purple.svg?component';

import EmojiList from '@components/ServiceHeader/EmojiService/EmojiList';
import ProfileImageList from '@components/ServiceHeader/ProfileImageList';

import styles from './Card.module.scss';

const cx = classNames.bind(styles);

// 미리 이미지 로드 처리 (최대 10개)
const preloadedImages = new Set<string>();
const MAX_PRELOADED_IMAGES = 10;

// 미리 이미지 로드 함수
const preloadImage = (src: string) => {
  if (preloadedImages.has(src) || preloadedImages.size >= MAX_PRELOADED_IMAGES) return;

  // 브라우저 환경에서만 실행
  if (typeof window !== 'undefined') {
    const img = new window.Image();
    img.src = src;
    preloadedImages.add(src);
  }
};

type CardProps = Omit<Recipient, 'createdAt'> & {
  backgroundImageURL?: UrlString | null;
  backgroundColor?: ColorchipColors;
  index?: number;
};

// 이미지 로더 커스터마이징
const customLoader = ({ src, width }: { src: string; width: number }) => {
  // picsum.photos 이미지인 경우 최적화된 URL로 변환
  if (src && src.includes('picsum.photos')) {
    // 작은 사이즈의 이미지 요청 (300px 기본값)
    const imageSize = Math.min(width || 300, 300);

    return src
      .replace(/picsum\.photos\/id\/(\d+)\/\d+\/\d+/, `picsum.photos/id/$1/${imageSize}/${imageSize}`)
      .replace('https://', '//');
  }

  return src;
};

// picsum ID 추출 함수
const extractPicsumId = (url: string | null): string | null => {
  if (!url) return null;

  const match = url.match(/picsum\.photos\/id\/(\d+)/);

  return match ? match[1] : null;
};

export default function Card({
  backgroundColor,
  name,
  messageCount,
  id,
  backgroundImageURL = null,
  index = 0,
}: CardProps) {
  const pattern = selectPattern(backgroundColor as ColorchipColors);
  const hasBackgroundImage = backgroundImageURL !== null;

  // 이미지 ID 추출
  const picsumId = useMemo(() => extractPicsumId(backgroundImageURL), [backgroundImageURL]);

  // 매우 작은 저해상도 이미지 URL (20px)
  const tinyImageUrl = picsumId ? `//picsum.photos/id/${picsumId}/20/20` : null;

  // 중간 해상도 이미지 URL (200px)
  const mediumImageUrl = picsumId ? `//picsum.photos/id/${picsumId}/200/200` : null;

  const handleEmojiClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleEmojiHover = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const optimizedImageUrl = useMemo(() => {
    if (!backgroundImageURL) return '';

    return backgroundImageURL.replace(/picsum\.photos\/id\/(\d+)\/\d+\/\d+/, 'picsum.photos/id/$1/300/300');
  }, [backgroundImageURL]);

  const { ref: cardRef, inView: isVisible } = useInView({
    triggerOnce: true,
    rootMargin: '400px 0px', // 400px 일찍 로드 시작 (화면 4개 높이 전에 미리 로딩)
    threshold: 0,
  });

  // 이미지 로딩 단계 관리 (0: tiny, 1: medium, 2: full)
  const [loadingStage, setLoadingStage] = useState(0);
  const [src, setSrc] = useState(tinyImageUrl || '');
  const isPriority = index < 3; // 첫 3개 이미지만 우선 로드

  // 점진적 이미지 로드 처리
  useEffect(() => {
    if (!hasBackgroundImage) return;

    // 1단계: tiny → medium 이미지
    if (loadingStage === 0 && mediumImageUrl) {
      const mediumImg = new window.Image();
      mediumImg.src = mediumImageUrl;
      mediumImg.onload = () => {
        setSrc(mediumImageUrl);
        setLoadingStage(1);
      };
    }

    // 2단계: 보이는 경우에만 full 이미지
    if (loadingStage === 1 && isVisible && optimizedImageUrl) {
      const highResImg = new window.Image();
      highResImg.src = optimizedImageUrl;
      highResImg.onload = () => {
        setSrc(optimizedImageUrl);
        setLoadingStage(2);
      };
    }
  }, [loadingStage, isVisible, hasBackgroundImage, tinyImageUrl, mediumImageUrl, optimizedImageUrl]);

  // 다음 이미지 미리 프리로드 (현재 보이는 이미지 +3개)
  useEffect(() => {
    if (isVisible && index < 10) {
      // 주변 이미지 프리로드
      const nextImageIndex = index + 3; // 현재 카드 + 3개 앞의 이미지 미리 로드
      const nextPicsumId = nextImageIndex + parseInt(picsumId || '0', 10);

      if (nextPicsumId) {
        preloadImage(`//picsum.photos/id/${nextPicsumId}/300/300`);
      }
    }
  }, [isVisible, index, picsumId]);

  return (
    <Link href={`/post/${id}`} className={cx('card-link')}>
      <article
        ref={cardRef}
        className={cx('card', backgroundColor as ColorchipColors, hasBackgroundImage && 'background-image')}
        style={{ contain: 'paint' }} // 렌더링 성능 최적화
      >
        {hasBackgroundImage && (
          <div className={cx('image-container', { loaded: loadingStage > 0 })}>
            <NextImage
              src={src}
              alt={`${name}의 배경 이미지`}
              fill
              sizes='(max-width: 768px) 100vw, 275px'
              priority={isPriority}
              className={cx('bg-image')}
              placeholder='blur'
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='275' height='260'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23a1a1a1'/%3E%3C/svg%3E"
              quality={60}
              loading={isPriority ? 'eager' : 'lazy'}
              loader={customLoader}
              onLoad={() => setLoadingStage((prev) => Math.max(prev, 1))}
              fetchPriority={isPriority ? 'high' : 'auto'}
            />
            <div className={cx('overlay')} />
          </div>
        )}

        <header className={cx('post-info')}>
          <h1 className={cx('recipient')}>To.{name} </h1>
          <ProfileImageList imageUrls={[]} />
          <p className={cx('post-count')}>
            <span>{messageCount}</span>명이 작성했어요!
          </p>
        </header>

        <footer className={cx('emoji-area')}>
          <div className={cx('horizontal-line')} />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div onClick={handleEmojiClick} onMouseEnter={handleEmojiHover} role='button' tabIndex={0}>
            <EmojiList gridColumns={3} recipientId={id} displayLimit={3} />
          </div>
        </footer>

        {!hasBackgroundImage && <div className={cx('pattern')}>{pattern}</div>}
      </article>
    </Link>
  );
}

function selectPattern(color: ColorchipColors) {
  switch (color) {
    case 'purple':
      return <PatternPurple />;
    case 'blue':
      return <PatternBlue />;
    case 'green':
      return <PatternGreen />;
    case 'beige':
      return <PatternBeige />;
    default:
      return null;
  }
}
