import { Button, Input } from 'antd';
import Text from 'antd/lib/typography/Text';
import axios from 'axios';
import React, { useRef } from 'react';
import { setToken } from '../auth/token';

interface Props {
setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 1000,
});

function Login(props: Props) {
  const { setLogin } = props;

  const username = useRef<Input>(null);
  const password = useRef<Input>(null);

  const doLogin = async () => {
    const aid = username.current?.state.value;
    const pwd = password.current?.state.value;

    if (!aid || !pwd) {
      alert('请输入账号密码');
      return;
    }

    const param = new URLSearchParams();
    param.append('aid', aid);
    param.append('password', pwd);
    const rsp = await instance({
      url: '/nimda/admin',
      method: 'POST',
      data: param,
    });

    if (!rsp.data || rsp.data.code !== 0) {
      alert('登录失败');
      return;
    }

    const { token } = rsp.data.data;
    if (!token) {
      alert('token错误');
      return;
    }

    setToken(token);
    setLogin(true);
  };

  return (
    <>
      <Text>登录</Text>
      <Input ref={username} />
      <Input ref={password} />
      <Button onClick={doLogin} type="primary">登录</Button>
    </>
  );
}

export default Login;
