import { customAxios } from 'lib/axios';

interface ImageUploadResponse {
  success: boolean;
  imageUrl?: string;
  message?: string;
}

export const signIn = async (id: string, password: string) => {
  const { data } = await customAxios.post('/auth/sign-in', {
    id,
    password,
  });
  return data;
};

export const postImg = async (image: string): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await customAxios.post('/user/image', formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};
