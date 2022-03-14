import { message } from 'antd';
import { useCallback } from 'react';
import { CGI } from '../../constant/cgi';
import { DishProps } from '../../constant/entity';
import { usePost } from '../../request/request';
import { useAddDishes, useSetCreateModalVisible } from '../../store/dish/hooks';

export const useCloseModal = () => {
  const setCreateModalVisable = useSetCreateModalVisible();
  return useCallback(() => {
    setCreateModalVisable(false);
  }, [setCreateModalVisable]);
};

export const useSubmit = () => {
  const doPost = usePost();
  const addDishes = useAddDishes();
  return useCallback(async (dishes: DishProps[]) => {
    const resData = await doPost(CGI.DISH, { dishes });
    if (!resData) {
      message.error('创建失败');
      return false;
    }

    message.success('创建成功');
    addDishes(dishes);
    return true;
  }, [doPost, addDishes]);
};
