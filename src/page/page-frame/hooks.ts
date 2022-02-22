import { useCallback } from 'react';
import { removeToken } from '../../auth/token';
import { useSetIsLogin } from '../../store/user/hooks';

export const useLogOut = () => {
  const setIsLogin = useSetIsLogin();
  return useCallback(() => {
    setIsLogin(false);
    removeToken();
  }, [setIsLogin]);
};
