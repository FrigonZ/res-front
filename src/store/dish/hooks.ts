import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DishProps } from '../../constant/entity';
import {
  addDishes, setCreateModalVisable, setDishes, setIsFetching,
} from './action';

export const useSetCreateModalVisible = () => {
  const dispatch = useDispatch();
  return useCallback((createModalVisible: boolean) => {
    const action = setCreateModalVisable({ createModalVisible });
    dispatch(action);
  }, [dispatch]);
};

export const useSetDishes = () => {
  const dispatch = useDispatch();
  return useCallback((dishes: DishProps[]) => {
    const action = setDishes({ dishes });
    dispatch(action);
  }, [dispatch]);
};

export const useAddDishes = () => {
  const dispatch = useDispatch();
  return useCallback((dishes: DishProps[]) => {
    const action = addDishes({ dishes });
    dispatch(action);
  }, [dispatch]);
};

export const useSetIsFetching = () => {
  const dispatch = useDispatch();
  return useCallback((isFetching: boolean) => {
    const action = setIsFetching({ isFetching });
    dispatch(action);
  }, [dispatch]);
};
