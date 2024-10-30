import { customAxios } from 'lib/axios';

export const signIn = async (id: string, password: string) => {
  const { data } = await customAxios.post('/auth/sign-in', {
    id,
    password,
  });
  return data;
};

export const postImg = async (image: string) => {
  const { data } = await customAxios.post('/user/image', {
    image,
  });
  return data;
};
