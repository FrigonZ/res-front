import { useCallback } from 'react';
import { CGI } from '../../constant/cgi';
import { useGet } from '../../request/request';
import { useSetOrders } from '../../store/order/hooks';

/** 拉取订单信息 */
export const useFetchOrders = () => {
  const doGet = useGet();
  const setOrders = useSetOrders();
  return useCallback(async () => {
    const { orders } = await doGet(CGI.ORDER, {}) || {};
    if (!orders || !orders.length) {
      return;
    }

    setOrders(orders);
  }, [doGet, setOrders]);
};
