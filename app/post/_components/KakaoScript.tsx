// KakaoScript.tsx

'use client';

import Script from 'next/script';

function KakaoScript() {
  const onLoad = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  };

  return <Script src='https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.js' strategy='beforeInteractive' onLoad={onLoad} />;
}

export default KakaoScript;
