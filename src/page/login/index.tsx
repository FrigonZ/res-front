import { Button, Input } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../constant/store';
import { useLogin } from './hooks';

function Login() {
  const username = useRef<Input>(null);
  const password = useRef<Input>(null);
  const doLogin = useLogin();
  const { isLogin } = useSelector((state: State) => state.user);

  const handleClick = () => {
    const aid = username.current?.state.value;
    const pwd = password.current?.state.value;

    doLogin(aid, pwd);
  };

  return !isLogin ? (
    <>
      <Text>登录</Text>
      <Input ref={username} />
      <Input ref={password} />
      <Button onClick={handleClick} type="primary">登录</Button>
    </>
  ) : (
    <Navigate to="/" />
  );
}

export default Login;
