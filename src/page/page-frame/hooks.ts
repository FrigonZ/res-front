import { useCallback } from 'react';
import { removeToken } from '../../utils/token';
import { useSetIsLogin } from '../../store/user/hooks';
import { closeWebSocket } from '../../utils/ws';
import { useSetIsRunning } from '../../store/busi/hooks';

/** 用户退出 */
export const useLogOut = () => {
  const setIsLogin = useSetIsLogin();
  return useCallback(() => {
    setIsLogin(false);
    removeToken();
  }, [setIsLogin]);
};

export const useStopBusi = () => {
  const setIsRunning = useSetIsRunning();
  return useCallback(() => {
    closeWebSocket();
    setIsRunning(false);
  }, [setIsRunning]);
};
