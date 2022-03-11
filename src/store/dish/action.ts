import { Action } from '../../constant/store';

export const enum DishAction {
  SET_CREATE_MODAL_VISIBLE = 'SET_CREATE_MODAL_VISIBLE',
}

export interface SetCreateModalVisiblePaylod {
  createModalVisible: boolean;
}

export const setCreateModalVisable = (payload: SetCreateModalVisiblePaylod): Action => ({
  type: DishAction.SET_CREATE_MODAL_VISIBLE,
  payload,
});
