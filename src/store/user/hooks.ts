import { useDispatch } from 'react-redux';
import { setIsLogin } from './action';

export const useSetIsLogin = () => {
  const dispatch = useDispatch();
  return (isLogin: boolean) => {
    const action = setIsLogin({ isLogin });
    dispatch(action);
  };
};
