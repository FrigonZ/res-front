import { Button } from 'antd';
import React, { useState } from 'react';
import { closeWebSocket, createWebSocket } from '../../utils/ws';

function Main() {
  const [data, setData] = useState('');

  const handleConnect = () => {
    createWebSocket((msg: string) => setData(msg));
  };

  return (
    <div>
      <div>Main</div>
      <Button onClick={handleConnect}>connect</Button>
      <Button onClick={closeWebSocket}>disconnect</Button>
      <div>{data}</div>
    </div>
  );
}

export default Main;
