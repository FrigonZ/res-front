import { useCallback } from 'react';
import { removeToken } from '../../utils/token';
import { useSetIsLogin } from '../../store/user/hooks';

export const useLogOut = () => {
  const setIsLogin = useSetIsLogin();
  return useCallback(() => {
    setIsLogin(false);
    removeToken();
  }, [setIsLogin]);
};
