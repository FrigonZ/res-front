import { message } from 'antd';
import React, { useRef, useState } from 'react';
import { CGI } from '../constant/cgi';
import { usePost } from '../request/request';

function FileUpload() {
  const input = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState('');
  const doPost = usePost();

  const doUpload = async () => {
    if (!input.current?.files?.length) {
      message.error('请选择文件');
      return;
    }
    const file = input.current.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const data = await doPost(
      CGI.COS,
      formData,
    );
    if (!data?.url) return;
    setUrl(data.url);
    message.success('上传成功');
  };

  return (
    <>
      <input ref={input} type="file" />
      <button type="button" onClick={doUpload}>上传</button>
      {url ? (
        <a href={url}>查看文件</a>
      ) : null}
    </>
  );
}

export default FileUpload;
