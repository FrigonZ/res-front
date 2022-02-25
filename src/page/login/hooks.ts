import { message } from 'antd';
import { useCallback } from 'react';
import { setToken } from '../../utils/token';
import { usePost } from '../../request/request';
import { useSetIsLogin } from '../../store/user/hooks';

export const useLogin = () => {
  const setLogin = useSetIsLogin();
  const doPost = usePost();
  return useCallback(async (aid: string, pwd: string) => {
    if (!aid || !pwd) {
      message.info('请输入账号密码');
      return;
    }

    const data = await doPost('/nimda/admin', {
      aid,
      password: pwd,
    });

    if (!data) return;

    const { token } = data;
    if (!token) {
      message.info('token错误');
      return;
    }

    setToken(token);
    setLogin(true);
  }, [setLogin, doPost]);
};
