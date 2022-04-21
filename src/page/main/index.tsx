import React from 'react';
import { useSelector } from 'react-redux';
import BusiOrder from '../../components/busi-order';
import { Order, OrderStatus } from '../../constant/entity';
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

  const mockOrder: Order = {
    oid: 1,
    time: new Date(),
    status: OrderStatus.ON_PROCESS,
    seat: '1',
    uid: 0,
    dishes: [{
      did: 1,
    }, {
      did: 3,
    }, {
      did: 3,
    }, {
      did: 3,
    }, {
      did: 4,
    }, {
      did: 6,
    }],
    price: 40,
  };

  return orders.length ? (
    <div className={less.start}>
      <img alt="no-order" src={IMAGE.NO_ORDER} />
      <span>暂无订单</span>
    </div>
  ) : (
    <div className={less.orders}>
      <BusiOrder order={mockOrder} />
    </div>
  );
}

export default Main;
