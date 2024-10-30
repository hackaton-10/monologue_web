import { customAxios } from 'lib/axios';

export const signIn = async (id: string, password: string) => {
  const { data } = await customAxios.post('/auth/sign-in', {
    id,
    password,
  });
  return data;
};
