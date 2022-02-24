/* eslint-disable import/no-cycle */
import { message } from 'antd';
import axios from 'axios';
import { useCallback } from 'react';
import { getToken } from '../auth/token';
import { ResCode, ResponseData } from '../constant/protocol';
import { useSetIsLogin } from '../store/user/hooks';
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

const useResponseHandler = () => {
  const setLogin = useSetIsLogin();

  return useCallback((code: ResCode) => {
    const map = {
      [ResCode.SUCCESS]: () => true,
      [ResCode.FAIL]: (msg: string) => {
        message.error(`请求失败, msg=${msg}`);
        return false;
      },
      [ResCode.AUTH_FAIL]: () => {
        message.error('登录过期，请重新登录');
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

export const doGet = async (url: string, data?: any) => {
  let targetUrl = url;
  if (data) {
    targetUrl = joinParams(url, data);
  }
  const result = await instance.get(targetUrl);
  return result;
};
