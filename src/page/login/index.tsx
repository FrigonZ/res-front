import { Button, Input } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useRef } from 'react';
import { useLogin } from './hooks';

function Login() {
  const username = useRef<Input>(null);
  const password = useRef<Input>(null);
  const doLogin = useLogin();

  const aid = username.current?.state.value;
  const pwd = password.current?.state.value;

  return (
    <>
      <Text>登录</Text>
      <Input ref={username} />
      <Input ref={password} />
      <Button onClick={() => doLogin(aid, pwd)} type="primary">登录</Button>
    </>
  );
}

export default Login;
