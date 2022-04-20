import { Input } from 'antd';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CGI } from '../../constant/cgi';
import { State } from '../../constant/store';
import { useGet } from '../../request/request';
import {
  useSetCreateModalVisible,
  useSetDishes,
  useSetGroupModalVisible,
  useSetGroups,
  useSetIsFetching,
  useSetSubDishes,
} from '../../store/dish/hooks';

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

export const useReset = (search: React.RefObject<Input>) => {
  const setSubDishes = useSetSubDishes();
  return useCallback(() => {
    search.current?.setValue('');
    setSubDishes([]);
  }, [search, setSubDishes]);
};

export const useHandleSearch = () => {
  const { dishes } = useSelector((state: State) => state.dish);
  const setSubDishes = useSetSubDishes();
  return useCallback((value: string) => {
    const subDishes = dishes.filter((dish) => dish.name.indexOf(value) !== -1);
    setSubDishes(subDishes);
  }, [setSubDishes, dishes]);
};

export const useOpenGroupModal = () => {
  const setGroupModalVisible = useSetGroupModalVisible();
  return useCallback(() => {
    setGroupModalVisible(true);
  }, [setGroupModalVisible]);
};

export const useFetchGroups = () => {
  const doGet = useGet();
  const setGroups = useSetGroups();
  return useCallback(async () => {
    const { groups } = await doGet(CGI.GROUP, {});
    if (!groups || !groups.length) {
      return;
    }

    setGroups(groups);
  }, [doGet, setGroups]);
};
