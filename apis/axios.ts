import axios, { AxiosInstance } from 'axios';

import { handleApiError } from '@/utils/errorHandler';

// 환경 변수를 상수로 명확하게 정의
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

// API 요청 기본 설정
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: DEFAULT_HEADERS,
});

// 공통 에러 처리 인터셉터 추가
const addErrorInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      handleApiError(error);

      // eslint-disable-next-line compat/compat
      return Promise.reject(error);
    },
  );
};

addErrorInterceptor(instance);
