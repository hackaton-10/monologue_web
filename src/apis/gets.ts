import { customAxios } from 'lib/axios';

export const user = async () => {
  const { data } = await customAxios.get('/user');
  return data;
};
