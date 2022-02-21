import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 1000,
});

export const doPost = async (url: string, data: any) => {
  const result = await instance.post(url, data);
  return result;
};
