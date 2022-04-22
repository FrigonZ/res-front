import { message } from 'antd';
import { useCallback } from 'react';
import { OrderAction } from '../../constant/entity';
import { WebSocketResponse, WebSocketUniq } from '../../constant/protocol';
import { useAddOrders, useSetIsRunning } from '../../store/busi/hooks';
import { useSetIsLogin } from '../../store/user/hooks';
import { removeToken } from '../../utils/token';
import { addWaitData, createWebSocket } from '../../utils/ws';

export const useHandleMessage = () => {
  const setLogin = useSetIsLogin();
  const addOrders = useAddOrders();

  return useCallback((msg: string) => {
    const response = JSON.parse(msg) as WebSocketResponse;
    const map = {
      [OrderAction.AUTH_FAIL]: () => {
        message.error('鉴权失败');
        removeToken();
        setLogin(false);
      },
      [OrderAction.GET]: () => null,
      [OrderAction.SET]: (wsUniq: WebSocketUniq) => {
        const { orders } = wsUniq.data || {};
        if (orders) {
          addOrders(orders);
          addWaitData({
            action: OrderAction.CONFIRM,
            options: {
              oid: wsUniq.id,
            },
          });
        }
      },
      [OrderAction.CONFIRM]: () => null,
      [OrderAction.HEART_BEAT]: () => null,
      [OrderAction.FINISH]: () => null,
    };
    response.data.forEach((wsUniq) => {
      const handler = map[wsUniq.action];
      handler(wsUniq);
    });
  }, [setLogin, addOrders]);
};

export const useStartBusi = () => {
  const setIsRunning = useSetIsRunning();
  const handleMsg = useHandleMessage();
  return useCallback(() => {
    setIsRunning(true);
    createWebSocket(handleMsg);
  }, [setIsRunning, handleMsg]);
};
