/** [ui]图片上传组件 */
import React, { useRef } from 'react';
import { IMAGE } from '../../constant/image';
import { Style } from '../../constant/types';
import { generateUnid } from '../../utils/unid';
import { useUpload } from './hooks';
import less from './file-upload.module.less';

interface Props {
  /** 设置图片url */
  setUrl: any;
  /** 图片url */
  url: string;
  /** 容器样式, 默认40*40 */
  style?: Style;
}

/** [ui]图片上传组件 */
function FileUpload({
  setUrl,
  url,
  style,
}: Props) {
  const input = useRef<HTMLInputElement>(null);
  const doUpload = useUpload();
  const unid = generateUnid('fip');

  /** 上传图片 */
  const handleUpload = async () => {
    const fileList = input.current?.files;
    const targetUrl = await doUpload(fileList);
    if (targetUrl) setUrl(targetUrl);
  };

  /** 重置组件 */
  const handleClear = () => {
    setUrl('');
  };

  return (
    <div style={style}>
      { url ? (
        <input
          className={less.img}
          type="image"
          src={url}
          alt="img"
          onClick={handleClear}
        />
      ) : (
        <label className={less.label} htmlFor={unid}>
          <img className={less.upload} src={IMAGE.UPLOAD} alt="upload" />
          <input
            className={less.input}
            id={unid}
            ref={input}
            type="file"
            accept=".jpg,.png"
            onChange={handleUpload}
          />
        </label>
      )}
    </div>
  );
}

FileUpload.defaultProps = {
  style: {
    width: 40,
    height: 40,
  },
};

export default FileUpload;
