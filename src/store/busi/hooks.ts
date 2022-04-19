import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setIsRunning } from './action';

export const useSetIsRunning = () => {
  const dispatch = useDispatch();
  return useCallback((isRunning: boolean) => {
    const action = setIsRunning({ isRunning });
    dispatch(action);
  }, [dispatch]);
};
