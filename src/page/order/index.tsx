/** 餐品页 */
import { Input } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useEffect, useRef } from 'react';
import OrderTable from '../../components/order-table';
import { useFetchOrders } from './hooks';
import less from './order.module.less';

/** 餐品页 */
function Order() {
  const input = useRef<Input>(null);
  const fetchOrders = useFetchOrders();

  useEffect(() => {
    fetchOrders();
  });

  return (
    <div className={less.wrap}>
      <div className={less.top}>
        <Search className={less.search} placeholder="订单号" ref={input} />
      </div>
      <OrderTable />
    </div>
  );
}

export default Order;
