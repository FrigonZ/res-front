import { useCallback } from 'react';
import { useSetCreateModalVisible } from '../../store/dish/hooks';

export const useOpenModal = () => {
  const setCreateModalVisable = useSetCreateModalVisible();
  return useCallback(() => {
    setCreateModalVisable(true);
  }, [setCreateModalVisable]);
};
