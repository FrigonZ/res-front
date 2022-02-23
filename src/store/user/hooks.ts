import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setIsLogin } from './action';

export const useSetIsLogin = () => {
  const dispatch = useDispatch();
  return useCallback((isLogin: boolean) => {
    const action = setIsLogin({ isLogin });
    dispatch(action);
  }, [dispatch]);
};
