import { Button } from 'antd';
import React from 'react';
import { closeWebSocket, createWebSocket } from '../../utils/ws';
import { useHandleMessage } from './hooks';

function Main() {
  const handleMessage = useHandleMessage();

  const handleConnect = () => {
    createWebSocket(handleMessage);
  };

  return (
    <div>
      <div>Main</div>
      <Button onClick={handleConnect}>connect</Button>
      <Button onClick={closeWebSocket}>disconnect</Button>
    </div>
  );
}

export default Main;
