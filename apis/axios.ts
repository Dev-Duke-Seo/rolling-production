import axios, { AxiosInstance } from 'axios';

import { handleApiError } from '@/utils/errorHandler';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export const instanceWithTeamId = axios.create({
  baseURL: `${BASE_URL}/${TEAM_ID}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const instanceWithoutTeamId = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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

addErrorInterceptor(instanceWithTeamId);
addErrorInterceptor(instanceWithoutTeamId);
