import { Input, message } from 'antd';
import React, { useCallback } from 'react';
import { CGI } from '../../constant/cgi';
import { Discount } from '../../constant/entity';
import { useFetchDiscounts } from '../../page/dish/hooks';
import { usePost, usePut } from '../../request/request';
import { useSetDiscountModalVisible } from '../../store/dish/hooks';

export const useCloseModal = () => {
  const setDiscountModalVisible = useSetDiscountModalVisible();
  return useCallback(() => {
    setDiscountModalVisible(false);
  }, [setDiscountModalVisible]);
};

export const useCreate = (sdInput: React.RefObject<Input>, dcInput: React.RefObject<Input>) => {
  const doPost = usePost();
  const fetchDiscounts = useFetchDiscounts();
  return useCallback(async () => {
    const standard = sdInput.current?.state.value;
    const discount = dcInput.current?.state.value;
    const target: Discount = {
      standard,
      discount,
    };
    const resData = await doPost(CGI.DISCOUNT, { discount: target });
    if (!resData) {
      message.error('添加失败');
      return;
    }

    message.success('创建成功');
    sdInput.current?.setValue('');
    dcInput.current?.setValue('');
    fetchDiscounts();
  }, [doPost, fetchDiscounts, sdInput, dcInput]);
};

export const useDeleteDiscount = () => {
  const doDelete = usePut();
  const fetchDiscounts = useFetchDiscounts();
  return useCallback(async (did: number) => {
    const resData = await doDelete(CGI.DISCOUNT, { did });
    if (!resData) {
      message.error('删除失败');
      return;
    }

    message.success('删除成功');

    fetchDiscounts();
  }, [doDelete, fetchDiscounts]);
};
