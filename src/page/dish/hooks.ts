import { useCallback } from 'react';
import { CGI } from '../../constant/cgi';
import { useGet } from '../../request/request';
import { useSetCreateModalVisible, useSetDishes, useSetIsFetching } from '../../store/dish/hooks';

export const useOpenModal = () => {
  const setCreateModalVisable = useSetCreateModalVisible();
  return useCallback(() => {
    setCreateModalVisable(true);
  }, [setCreateModalVisable]);
};

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
