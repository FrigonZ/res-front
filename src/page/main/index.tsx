import React from 'react';
import { useSelector } from 'react-redux';
import BusiOrder from '../../components/busi-order';
import { IMAGE } from '../../constant/image';
import { State } from '../../constant/store';
import { useStartBusi } from './hooks';
import less from './main.module.less';

function Main() {
  const { isRunning, orders } = useSelector((state: State) => state.busi);
  const startBusi = useStartBusi();

  if (!isRunning) {
    return (
      <div className={less.start} onClick={startBusi}>
        <img alt="start" src={IMAGE.READY_TO_OPEN} />
        <span>开始营业</span>
      </div>
    );
  }

  return !orders.length ? (
    <div className={less.start}>
      <img alt="no-order" src={IMAGE.NO_ORDER} />
      <span>暂无订单</span>
    </div>
  ) : (
    <div className={less.orders}>
      {orders.map((order) => <BusiOrder key={order.oid} order={order} />)}
    </div>
  );
}

export default Main;
