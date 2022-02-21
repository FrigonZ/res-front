import { message } from 'antd';
import { setToken } from '../../auth/token';
import { doPost } from '../../request/request';
import { useSetIsLogin } from '../../store/user/hooks';

export const useLogin = () => {
  const setLogin = useSetIsLogin();
  return async (aid: string, pwd: string) => {
    if (!aid || !pwd) {
      message.info('请输入账号密码');
      return;
    }

    const rsp = await doPost('/nimda/admin', {
      aid,
      password: pwd,
    });

    if (!rsp.data || rsp.data.code !== 0) {
      message.info('登录失败');
      return;
    }

    const { token } = rsp.data.data;
    if (!token) {
      message.info('token错误');
      return;
    }

    setToken(token);
    setLogin(true);
  };
};
