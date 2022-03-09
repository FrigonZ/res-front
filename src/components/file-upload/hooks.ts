import { message } from 'antd';
import { useCallback } from 'react';
import { CGI } from '../../constant/cgi';
import { usePost } from '../../request/request';

export const useUpload = () => {
  const doPost = usePost();
  return useCallback(async (files: FileList | null | undefined) => {
    if (!files?.length) {
      return '';
    }
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    const data = await doPost(
      CGI.COS,
      formData,
    );
    if (!data?.url) return '';
    message.success('上传成功');

    return data.url;
  }, [doPost]);
};
