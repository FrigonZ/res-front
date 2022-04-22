import { message } from 'antd';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CGI } from '../../constant/cgi';
import { OrderStatus } from '../../constant/entity';
import { State } from '../../constant/store';
import { usePut } from '../../request/request';
import { useRemoveOrder } from '../../store/busi/hooks';

export const useGetDishName = () => {
  const { dishes } = useSelector((state: State) => state.dish);
  return useCallback((did: number) => {
    const target = dishes.find((dish) => Number(dish.did) === did);
    return target?.name || '异常餐品';
  }, [dishes]);
};

export const useFinishOrder = () => {
  const doPut = usePut();
  const remove = useRemoveOrder();

  return useCallback(async (oid: number) => {
    const result = await doPut(CGI.ORDER, {
      oid,
      status: OrderStatus.FINISHED,
    });

    if (result) {
      remove(oid);
      message.success('订单完成');
      return;
    }

    message.error('提交失败，请稍后再试');
  }, [doPut, remove]);
};

export const useCancelOrder = () => {
  const doPut = usePut();
  const remove = useRemoveOrder();

  return useCallback(async (oid: number) => {
    const result = await doPut(CGI.ORDER, {
      oid,
      status: OrderStatus.CANCELED,
    });

    if (result) {
      remove(oid);
      message.success('订单完成');
      return;
    }

    message.error('提交失败，请稍后再试');
  }, [doPut, remove]);
};
