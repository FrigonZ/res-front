import React, { useEffect, useRef, useState } from 'react';
import { IMAGE } from '../../constant/image';
import { Style } from '../../constant/types';
import { generateUnid } from '../../utils/unid';
import { useUpload } from './hooks';
import css from './file-upload.module.css';

interface Props {
  onChange?: any;
  url?: string;
  style?: Style;
}

function FileUpload({
  onChange,
  url: initialUrl,
  style,
}: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(initialUrl);
  const doUpload = useUpload();
  const unid = generateUnid('fip');

  useEffect(() => {
    if (onChange) {
      onChange(url);
    }
  }, [url, onChange]);

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
          className={css.img}
          type="image"
          src={url}
          alt="img"
          onClick={handleClear}
        />
      ) : (
        <label className={css.label} htmlFor={unid}>
          <img className={css.upload} src={IMAGE.UPLOAD} alt="upload" />
          <input
            className={css.input}
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
  onChange: null,
  url: '',
  style: {
    width: 40,
    height: 40,
  },
};

export default FileUpload;
