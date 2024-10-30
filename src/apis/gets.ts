import { customAxios } from 'lib/axios';

export const getUser = async () => {
  const { data } = await customAxios.get('/user/profile');
  return data;
};
