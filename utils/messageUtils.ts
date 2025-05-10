/**
 * 기본 프로필 이미지 URL
 */
export const DEFAULT_PROFILE_IMAGE_URL =
  'https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png';

/**
 * 날짜를 한국 형식(YYYY.MM.DD)으로 변환
 * @param date Date 객체 또는 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (ex: 2023.05.12)
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\s/g, '')
    .replace(/\.$/, '');
};

/**
 * 메시지 내용을 Slate 에디터 형식으로 파싱
 * @param content 메시지 내용 (JSON 문자열 또는 일반 텍스트)
 * @returns Slate 에디터용 데이터 구조
 */
export const parseMessageContent = (content: string) => {
  if (!content) {
    return [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ];
  }

  try {
    // JSON 형식인 경우 파싱
    return JSON.parse(content);
  } catch (error) {
    // 일반 텍스트인 경우 Slate 형식으로 변환
    return [
      {
        type: 'paragraph',
        children: [{ text: content }],
      },
    ];
  }
};
