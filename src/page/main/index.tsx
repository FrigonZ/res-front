import React from 'react';
import { useSelector } from 'react-redux';
import { IMAGE } from '../../constant/image';
import { State } from '../../constant/store';
import { useStartBusi } from './hooks';
import less from './main.module.less';

function Main() {
  const { isRunning } = useSelector((state: State) => state.busi);
  const startBusi = useStartBusi();

  return isRunning ? (
    <div className={less.start}>
      <img alt="no-order" src={IMAGE.NO_ORDER} />
      <span>暂无订单</span>
    </div>
  ) : (
    <div className={less.start} onClick={startBusi}>
      <img alt="start" src={IMAGE.READY_TO_OPEN} />
      <span>开始营业</span>
    </div>
  );
}

export default Main;
