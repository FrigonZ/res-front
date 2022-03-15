import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DishForm, DishProps } from '../../constant/entity';
import {
  addDishes, setCreateModalVisable, setDishes, setEditDishId, setInitialDish, setIsFetching,
} from './action';

/** 设置新增餐品弹窗可视度 */
export const useSetCreateModalVisible = () => {
  const dispatch = useDispatch();
  return useCallback((createModalVisible: boolean) => {
    const action = setCreateModalVisable({ createModalVisible });
    dispatch(action);
  }, [dispatch]);
};

/** 设置线上餐品 */
export const useSetDishes = () => {
  const dispatch = useDispatch();
  return useCallback((dishes: DishProps[]) => {
    const action = setDishes({ dishes });
    dispatch(action);
  }, [dispatch]);
};

/** 添加线上餐品 */
export const useAddDishes = () => {
  const dispatch = useDispatch();
  return useCallback((dishes: DishProps[]) => {
    const action = addDishes({ dishes });
    dispatch(action);
  }, [dispatch]);
};

/** 设置餐品请求中标记 */
export const useSetIsFetching = () => {
  const dispatch = useDispatch();
  return useCallback((isFetching: boolean) => {
    const action = setIsFetching({ isFetching });
    dispatch(action);
  }, [dispatch]);
};

export const useSetInialDish = () => {
  const dispatch = useDispatch();
  return useCallback((initialDish: DishForm | null) => {
    const action = setInitialDish({ initialDish });
    dispatch(action);
  }, [dispatch]);
};

export const useSetEditDishId = () => {
  const dispatch = useDispatch();
  return useCallback((editId: string) => {
    const action = setEditDishId({ editId });
    dispatch(action);
  }, [dispatch]);
};
