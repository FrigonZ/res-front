/* eslint-disable import/no-cycle */
import { CGI } from '../constant/cgi';
import { doGet } from '../request/request';

let token = '';

const key = 'res-token';

export const initToken = () => {
  if (token) return;
  const cache = localStorage.getItem(key) || '';
  token = cache;
};

export const getToken = () => token;

export const checkToken = async () => {
  if (!token) return false;
  const result = await doGet(CGI.LOGIN);
  if (result.data.code !== 0) return false;
  return true;
};

export const setToken = (jwt: string) => {
  token = jwt;
  localStorage.setItem(key, token);
};

export const removeToken = () => {
  localStorage.removeItem(key);
};
