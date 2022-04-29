import { message } from 'antd';
import { useCallback } from 'react';
import { OrderAction, OrderStatus } from '../../constant/entity';
import { WebSocketResponse, WebSocketUniq } from '../../constant/protocol';
import { useAddOrders, useRemoveOrder, useSetIsRunning } from '../../store/busi/hooks';
import { useSetIsLogin } from '../../store/user/hooks';
import { removeToken } from '../../utils/token';
import { addWaitData, createWebSocket } from '../../utils/ws';

export const useHandleMessage = () => {
  const setLogin = useSetIsLogin();
  const addOrders = useAddOrders();
  const removeOrder = useRemoveOrder();

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
          const { status = OrderStatus.ON_PROCESS } = wsUniq.options;
          if (status === OrderStatus.CANCELED) {
            removeOrder(orders[0].oid);
          } else {
            addOrders(orders);
          }
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
  }, [setLogin, addOrders, removeOrder]);
};

export const useStartBusi = () => {
  const setIsRunning = useSetIsRunning();
  const handleMsg = useHandleMessage();
  return useCallback(() => {
    setIsRunning(true);
    createWebSocket(handleMsg);
  }, [setIsRunning, handleMsg]);
};
