/* eslint-disable import/no-cycle */
import { message } from 'antd';
import axios from 'axios';
import { useCallback } from 'react';
import { getToken, removeToken } from '../utils/token';
import { BASE_URL } from '../constant/cgi';
import { ResCode, ResponseData } from '../constant/protocol';
import { useSetIsLogin } from '../store/user/hooks';
import { joinParams } from '../utils/url';

/** 请求超时限制 */
const timeout = 6000;

/** axios请求实例 */
let instance = axios.create({
  baseURL: BASE_URL,
  timeout,
});

/** 更新axios请求配置 */
export const setInstance = () => {
  instance = axios.create({
    baseURL: BASE_URL,
    timeout,
    headers: {
      authorization: getToken(),
    },
  });
};

/** 请求响应统一处理 */
const useResponseHandler = () => {
  const setLogin = useSetIsLogin();

  return useCallback((code: ResCode): ((msg: string) => boolean) => {
    const map = {

      // 初步请求成功, 还需后续业务判断
      [ResCode.SUCCESS]: () => true,

      [ResCode.FAIL]: (msg: string) => {
        message.error(`请求失败, msg=${msg}`);
        return false;
      },

      // 授权失败移除当前登录状态
      [ResCode.AUTH_FAIL]: () => {
        message.error('登录过期，请重新登录');
        removeToken();
        setLogin(false);
        return false;
      },

      [ResCode.EXCEPTION]: () => {
        message.error('请求异常');
        return false;
      },
    };
    return map[code];
  }, [setLogin]);
};

// TODO: 修改返回结构，增加初步判断标记
/** post请求, 响应自动处理 */
export const usePost = () => {
  const getHandler = useResponseHandler();
  return useCallback(async (url: string, data: any) => {
    const result = await instance.post(url, data);
    const { code, msg, data: resData } = result.data as ResponseData<any>;
    const handler = getHandler(code);
    if (handler(msg)) {
      return resData;
    }

    return null;
  }, [getHandler]);
};

/** put请求, 响应自动处理 */
export const usePut = () => {
  const getHandler = useResponseHandler();
  return useCallback(async (url: string, data: any) => {
    const result = await instance.put(url, data);
    const { code, msg, data: resData } = result.data as ResponseData<any>;
    const handler = getHandler(code);
    if (handler(msg)) {
      return resData;
    }

    return null;
  }, [getHandler]);
};

/** get请求, 响应自动处理 */
export const useGet = () => {
  const getHandler = useResponseHandler();
  return useCallback(async (url: string, data: any) => {
    let targetUrl = url;
    if (data) {
      targetUrl = joinParams(url, data);
    }
    const result = await instance.get(targetUrl);
    const { code, msg, data: resData } = result.data as ResponseData<any>;
    const handler = getHandler(code);
    if (handler(msg)) {
      return resData;
    }

    return null;
  }, [getHandler]);
};

/** 基础get请求, 仅用于jwt鉴权 */
export const doGet = async (url: string, data?: any) => {
  let targetUrl = url;
  if (data) {
    targetUrl = joinParams(url, data);
  }
  const result = await instance.get(targetUrl);
  return result;
};
