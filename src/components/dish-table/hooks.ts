import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../constant/store';
import { useOpenModal } from '../../page/dish/hooks';
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
