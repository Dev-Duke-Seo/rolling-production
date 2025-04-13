import { axiosInstance } from '../axios';

export interface PublicApi {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  auth?: string;
  cors?: string;
  https?: boolean;
}

export interface GetPublicApisParams {
  category?: string;
}

export const getPublicApis = async (params?: GetPublicApisParams): Promise<PublicApi[]> => {
  const response = await axiosInstance.get('/public-apis', { params });
  return response.data;
};

export const getPublicApiById = async (apiId: string): Promise<PublicApi> => {
  const response = await axiosInstance.get(`/public-apis/${apiId}`);
  return response.data;
};

export const getPublicApisByCategory = async (category: string): Promise<PublicApi[]> => {
  const response = await axiosInstance.get('/public-apis', { params: { category } });
  return response.data;
}; 