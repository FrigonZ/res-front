import { Input, message } from 'antd';
import React, { useCallback } from 'react';
import { CGI } from '../../constant/cgi';
import { useFetchGroups } from '../../page/dish/hooks';
import { usePost } from '../../request/request';
import { useSetGroupModalVisible } from '../../store/dish/hooks';

export const useCloseModal = () => {
  const setGroupModalVisible = useSetGroupModalVisible();
  return useCallback(() => {
    setGroupModalVisible(false);
  }, [setGroupModalVisible]);
};

export const useCreateGroup = (input: React.RefObject<Input>) => {
  const doPost = usePost();
  const fetchGroups = useFetchGroups();
  return useCallback(async (value: string) => {
    const resData = await doPost(CGI.GROUP, { group: value });
    if (!resData) {
      message.error('添加失败');
      return;
    }

    message.success('创建成功');
    input.current?.setValue('');

    fetchGroups();
  }, [doPost, fetchGroups, input]);
};
