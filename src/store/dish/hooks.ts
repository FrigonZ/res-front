import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCreateModalVisable } from './action';

export const useSetCreateModalVisible = () => {
  const dispatch = useDispatch();
  return useCallback((createModalVisible: boolean) => {
    const action = setCreateModalVisable({ createModalVisible });
    dispatch(action);
  }, [dispatch]);
};
