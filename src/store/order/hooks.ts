import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Order } from '../../constant/entity';
import { setOrders } from './action';

export const useSetOrders = () => {
  const dispatch = useDispatch();
  return useCallback((orders: Order[]) => {
    const action = setOrders({ orders });
    dispatch(action);
  }, [dispatch]);
};
