import { useCallback } from 'react';
import { CGI } from '../../constant/cgi';
import { useGet } from '../../request/request';
import { useSetCreateModalVisible, useSetDishes, useSetIsFetching } from '../../store/dish/hooks';

/** 打开新增餐品弹窗 */
export const useOpenModal = () => {
  const setCreateModalVisable = useSetCreateModalVisible();
  return useCallback(() => {
    setCreateModalVisable(true);
  }, [setCreateModalVisable]);
};

/** 拉取餐品信息 */
export const useFetchDishes = () => {
  const doGet = useGet();
  const setDishes = useSetDishes();
  const setIsFetching = useSetIsFetching();
  return useCallback(async () => {
    setIsFetching(true);
    const { dishList } = await doGet(CGI.DISH, {});
    if (!dishList || !dishList.length) {
      return;
    }

    setDishes(dishList);
    setIsFetching(false);
  }, [doGet, setDishes, setIsFetching]);
};
