import { ColumnsType } from 'antd/lib/table';
import { Table, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { useSelector } from 'react-redux';
import { Order, OrderDish } from '../../constant/entity';
import { State } from '../../constant/store';
import less from './order-table.module.less';
import { useGetDishName } from './hooks';

interface Props {
  dishes: OrderDish[];
}

const columns: ColumnsType<Order> = [
  {
    key: 'oid',
    dataIndex: 'oid',
    title: '订单号',
  },
  {
    key: 'formatDate',
    dataIndex: 'formatDate',
    title: '时间',
  },
  {
    key: 'uid',
    dataIndex: 'uid',
    title: '顾客',
  },
  {
    key: 'dishes',
    dataIndex: 'dishes',
    title: '餐品',
    render: (dishes) => <DishesInfo dishes={dishes} />,
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: '价格',
  },
];

function DishesInfo({ dishes }: Props) {
  const getDishName = useGetDishName();

  if (!dishes) return null;

  const text = dishes.map((dish) => getDishName(dish.did)).join(',');

  return (
    <Tooltip title={text}>
      <Text className={less.dishes} ellipsis>{text}</Text>
    </Tooltip>
  );
}

function OrderTable() {
  const { orders } = useSelector((state: State) => state.order);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={orders}
        size="small"
        pagination={{
          defaultPageSize: 8,
        }}
      />
    </div>
  );
}

export default OrderTable;
