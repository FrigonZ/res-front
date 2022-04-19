import { message } from 'antd';
import { useCallback } from 'react';
import { OrderAction } from '../../constant/entity';
import { WebSocketResponse } from '../../constant/protocol';
import { useSetIsRunning } from '../../store/busi/hooks';
import { useSetIsLogin } from '../../store/user/hooks';
import { removeToken } from '../../utils/token';
import { createWebSocket } from '../../utils/ws';

export const useHandleMessage = () => {
  const setLogin = useSetIsLogin();

  return useCallback((msg: string) => {
    const response = JSON.parse(msg) as WebSocketResponse;
    const map = {
      [OrderAction.AUTH_FAIL]: () => {
        message.error('鉴权失败');
        removeToken();
        setLogin(false);
      },
      [OrderAction.GET]: () => null,
      [OrderAction.SET]: () => null,
      [OrderAction.CONFIRM]: () => null,
      [OrderAction.HEART_BEAT]: () => null,
      [OrderAction.FINISH]: () => null,
    };
    response.data.forEach((wsUniq) => {
      const handler = map[wsUniq.action];
      handler();
    });
  }, [setLogin]);
};

export const useStartBusi = () => {
  const setIsRunning = useSetIsRunning();
  const handleMsg = useHandleMessage();
  return useCallback(() => {
    setIsRunning(true);
    createWebSocket(handleMsg);
  }, [setIsRunning, handleMsg]);
};
