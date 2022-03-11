import React, { useRef } from 'react';
import { IMAGE } from '../../constant/image';
import { Style } from '../../constant/types';
import { generateUnid } from '../../utils/unid';
import { useUpload } from './hooks';
import less from './file-upload.module.less';

interface Props {
  setUrl: any;
  url: string;
  style?: Style;
}

function FileUpload({
  setUrl,
  url,
  style,
}: Props) {
  const input = useRef<HTMLInputElement>(null);
  const doUpload = useUpload();
  const unid = generateUnid('fip');

  const handleUpload = async () => {
    const fileList = input.current?.files;
    const targetUrl = await doUpload(fileList);
    if (targetUrl) setUrl(targetUrl);
  };

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
