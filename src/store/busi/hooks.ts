import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Order } from '../../constant/entity';
import { State } from '../../constant/store';
import { setBusiOrders, setIsRunning } from './action';

export const useSetIsRunning = () => {
  const dispatch = useDispatch();
  return useCallback((isRunning: boolean) => {
    const action = setIsRunning({ isRunning });
    dispatch(action);
  }, [dispatch]);
};

export const useAddOrders = () => {
  const dispatch = useDispatch();
  const { orders: origins } = useSelector((state:State) => state.busi);
  return useCallback((orders: Order[]) => {
    const action = setBusiOrders({
      orders: [...origins, ...orders],
    });
    dispatch(action);
  }, [dispatch, origins]);
};

export const useFinishOrder = () => {
  const dispatch = useDispatch();
  const { orders: origins } = useSelector((state:State) => state.busi);
  return useCallback((oid: number) => {
    const action = setBusiOrders({
      orders: origins.filter((order) => order.oid !== oid),
    });
    dispatch(action);
  }, [dispatch, origins]);
};
