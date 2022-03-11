/* eslint-disable @typescript-eslint/default-param-last */
import { Action, dishState, DishState } from '../../constant/store';
import { DishAction, SetCreateModalVisiblePaylod } from './action';

const setCreateModalVisable = (state: DishState, action: Action): DishState => {
  const { createModalVisible } = action.payload as SetCreateModalVisiblePaylod;
  return {
    ...state,
    createModalVisible,
  };
};

const defaultHandler = (state: DishState): DishState => ({ ...state });

const handleActionMap = {
  [DishAction.SET_CREATE_MODAL_VISIBLE]: setCreateModalVisable,
};

export const dish = (state: DishState = dishState, action: Action): DishState => {
  const { type } = action;
  const handler = handleActionMap[type as DishAction] || defaultHandler;
  return handler(state, action);
};
