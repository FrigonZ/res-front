import { message } from 'antd';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CGI } from '../../constant/cgi';
import { DishProps, DishStatus } from '../../constant/entity';
import { State } from '../../constant/store';
import { useFetchDishes, useOpenModal } from '../../page/dish/hooks';
import { usePut } from '../../request/request';
import { useSetEditDishId, useSetInialDish } from '../../store/dish/hooks';
import { format2DishForm } from '../../utils/draft';

export const useSetEditMode = () => {
  const { dishes } = useSelector((state: State) => state.dish);
  const setEditId = useSetEditDishId();
  const setInitalDish = useSetInialDish();
  const openModal = useOpenModal();

  return useCallback((did: string) => {
    const targetDish = dishes.find((dish) => dish.did === did);
    if (targetDish) {
      setEditId(did);
      const form = format2DishForm(targetDish);
      setInitalDish(form);
      openModal();
    }
  }, [dishes, setEditId, setInitalDish, openModal]);
};

export const useToggleDishStatus = () => {
  const { dishes } = useSelector((state: State) => state.dish);
  const doPut = usePut();
  const fetchDishes = useFetchDishes();
  return useCallback(async (did: string): Promise<boolean> => {
    const dish = dishes.find((ds) => ds.did === did);
    if (!dish) {
      message.error('无餐品数据');
      return false;
    }

    const targetDish: DishProps = {
      ...dish,
      status: dish.status === DishStatus.NORMAL ? DishStatus.CLOSED : DishStatus.NORMAL,
    };
    const resData = await doPut(CGI.DISH, { dish: targetDish });

    if (!resData) {
      message.error('修改失败');
      return false;
    }
    fetchDishes();
    return true;
  }, [dishes, doPut, fetchDishes]);
};

export const useGetToggleText = () => {
  const { dishes } = useSelector((state: State) => state.dish);
  return useCallback((did: string): string => {
    const dish = dishes.find((ds) => ds.did === did);
    if (!dish) {
      return '';
    }

    return dish.status === DishStatus.NORMAL ? '下架' : '上架';
  }, [dishes]);
};

export const useGetGroupName = () => {
  const { groups } = useSelector((state: State) => state.dish);
  return useCallback((gid: number) => {
    const target = groups.find((group) => group.gid === gid);
    if (!target) return '无分类';

    return target.name;
  }, [groups]);
};
