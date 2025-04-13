import { AxiosError } from 'axios';

/**
 * Axios 에러인지 확인하는 타입 가드 함수
 */
export function isAxiosError<T = any>(error: unknown): error is AxiosError<T> {
  return (error as AxiosError).isAxiosError === true;
}

/**
 * API 에러를 처리하는 함수
 * @param error API 호출 중 발생한 에러
 */
export function handleApiError(error: unknown): void {
  if (isAxiosError(error)) {
    if (error.response) {
      // 서버가 응답을 반환했지만, 상태 코드가 2xx 범위에 있지 않음
      console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
      // 요청이 만들어졌지만, 응답을 받지 못함
      console.error('No response received:', error.request);
    } else {
      // 요청을 설정하는 중에 에러가 발생
      console.error('Error setting up request:', error.message);
    }
  } else {
    // Axios 에러가 아닌 경우
    console.error('Unknown error occurred:', error);
  }

  // eslint-disable-next-line no-alert
  // alert('문제가 발생했습니다. 나중에 다시 시도해 주세요.');
}
