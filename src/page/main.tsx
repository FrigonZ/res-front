import { Button } from 'antd';
import React from 'react';

interface Props {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function Main(props: Props) {
  const { setLogin } = props;
  return (
    <>
      <div>main</div>
      <Button onClick={() => setLogin(false)}>退出</Button>
    </>
  );
}

export default Main;
