/* eslint-disable import/no-cycle */
import { CGI } from '../constant/cgi';
import { ResCode } from '../constant/protocol';
import { STORAGE } from '../constant/storage';
import { doGet, setInstance } from '../request/request';

/** jwt */
let token = '';

/** 初始化jwt token */
export const initToken = () => {
  if (token) return;
  const cache = localStorage.getItem(STORAGE.JWT_TOKEN) || '';
  token = cache;

  // 初始化token后更新axios请求配置
  setInstance();
};

/** 获取jwt token */
export const getToken = () => token;

/** 当前token鉴权 */
export const checkToken = async (): Promise<boolean> => {
  if (!token) return false;
  const result = await doGet(CGI.LOGIN);
  if (result.data.code !== ResCode.SUCCESS) return false;
  return true;
};

/** 设置jwt token */
export const setToken = (jwt: string) => {
  token = jwt;
  localStorage.setItem(STORAGE.JWT_TOKEN, token);

  // token改变后更新axios配置
  setInstance();
};

/** 移除token */
export const removeToken = () => {
  localStorage.removeItem(STORAGE.JWT_TOKEN);
  token = '';

  // token改变后更新axios配置
  setInstance();
};
