import { message } from 'antd';
import { useCallback } from 'react';
import { CGI } from '../../constant/cgi';
import { DishProps } from '../../constant/entity';
import { useFetchDishes } from '../../page/dish/hooks';
import { usePost, usePut } from '../../request/request';
import { useSetCreateModalVisible } from '../../store/dish/hooks';

/** 关闭新增餐品弹窗 */
export const useCloseModal = () => {
  const setCreateModalVisable = useSetCreateModalVisible();
  return useCallback(() => {
    setCreateModalVisable(false);
  }, [setCreateModalVisable]);
};

/** 提交新增餐品表单 */
export const useSubmit = () => {
  const doPost = usePost();
  const fetchDishes = useFetchDishes();
  return useCallback(async (dish: DishProps): Promise<boolean> => {
    const resData = await doPost(CGI.DISH, { dishes: [dish] });
    if (!resData) {
      message.error('创建失败');
      return false;
    }

    message.success('创建成功');

    // 新增餐品成功后将其加入store
    fetchDishes();
    return true;
  }, [doPost, fetchDishes]);
};

export const useEdit = () => {
  const doPut = usePut();
  const fetchDishes = useFetchDishes();
  return useCallback(async (dish: DishProps): Promise<boolean> => {
    const resData = await doPut(CGI.DISH, { dish });
    if (!resData) {
      message.error('编辑失败');
      return false;
    }

    message.success('编辑成功');

    // 新增餐品成功后将其加入store
    fetchDishes();
    return true;
  }, [doPut, fetchDishes]);
};
