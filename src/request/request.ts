/* eslint-disable import/no-cycle */
import axios from 'axios';
import { getToken } from '../auth/token';
import { joinParams } from '../utils/url';

let instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 6000,
});

export const setInstance = () => {
  instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 6000,
    headers: {
      authorization: getToken(),
    },
  });
};

export const doPost = async (url: string, data: any) => {
  const result = await instance.post(url, data);
  return result;
};

export const doGet = async (url: string, data?: any) => {
  let targetUrl = url;
  if (data) {
    targetUrl = joinParams(url, data);
  }
  const result = await instance.get(targetUrl);
  return result;
};
