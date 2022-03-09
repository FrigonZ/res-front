import React, { useEffect, useRef, useState } from 'react';
import { IMAGE } from '../../constant/image';
import { Style } from '../../constant/types';
import { generateUnid } from '../../utils/unid';
import { useUpload } from './hooks';

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
          type="image"
          src={url}
          alt="img"
          style={styles.img}
          onClick={handleClear}
        />
      ) : (
        <label htmlFor={unid} style={styles.label}>
          <img src={IMAGE.UPLOAD} alt="upload" style={styles.upload} />
          <input
            id={unid}
            ref={input}
            type="file"
            accept=".jpg,.png"
            style={styles.input}
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
    heght: 40,
  },
};

const styles: Record<any, Style> = {
  img: {
    width: '100%',
    height: '100%',
  },
  input: {
    display: 'none',
  },
  label: {
    width: '100%',
    height: '100%',
  },
  upload: {
    width: '100%',
    height: '100%',
  },
};

export default FileUpload;
