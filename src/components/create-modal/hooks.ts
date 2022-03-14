import { message } from 'antd';
import { useCallback } from 'react';
import { CGI } from '../../constant/cgi';
import { DishProps } from '../../constant/entity';
import { usePost } from '../../request/request';
import { useAddDishes, useSetCreateModalVisible } from '../../store/dish/hooks';

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
  const addDishes = useAddDishes();
  return useCallback(async (dishes: DishProps[]): Promise<boolean> => {
    const resData = await doPost(CGI.DISH, { dishes });
    if (!resData) {
      message.error('创建失败');
      return false;
    }

    message.success('创建成功');

    // 新增餐品成功后将其加入store
    // TODO: 缺少did，无法进行数据操作
    addDishes(dishes);
    return true;
  }, [doPost, addDishes]);
};
