import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../constant/store';

export const useGetDishName = () => {
  const { dishes } = useSelector((state: State) => state.dish);
  return useCallback((did: number) => {
    const target = dishes.find((dish) => Number(dish.did) === did);
    return target?.name || '异常餐品';
  }, [dishes]);
};
