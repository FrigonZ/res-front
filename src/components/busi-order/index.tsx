import React, { useState } from 'react';
import { Order, OrderDish } from '../../constant/entity';
import less from './busi-order.module.less';
import { countDish } from './helper';
import { useCancelOrder, useFinishOrder, useGetDishName } from './hooks';

interface Props {
  order: Order;
}

interface DishesProps {
  dishes: OrderDish[]
}

function BusiDishes({ dishes }: DishesProps) {
  const getDishName = useGetDishName();
  const formatDishes = countDish(dishes);
  const canFold = formatDishes.length > 2;
  const [isFolded, setIsFolded] = useState(false);

  const text = isFolded ? '展开' : '折叠';
  const toggleFold = () => setIsFolded(!isFolded);

  return (
    <div className={less.dishes}>
      {
        isFolded
          ? formatDishes.slice(0, 3).map((dish) => <div key={dish.did} className={less.light}>{`${dish.num}x    ${getDishName(dish.did)}`}</div>)
          : formatDishes.map((dish) => <div key={dish.did} className={less.light}>{`${dish.num}x    ${getDishName(dish.did)}`}</div>)
      }
      {
        canFold ? <div className={less.fold} onClick={toggleFold}>{text}</div> : null
      }
    </div>
  );
}

function BusiOrder({ order }: Props) {
  const {
    oid, formatDate, seat, dishes, price,
  } = order;
  const finishOrder = useFinishOrder();
  const cancelOrder = useCancelOrder();

  return (
    <div className={less.wrap}>
      <div className={less.top}>
        <div className={less.title}>
          <span className={less.dark}>{`订单号:#${oid}`}</span>
          <span className={less.light}>{`订单时间:${formatDate}`}</span>
        </div>
        <span className={less.dark}>{`座位号:#${seat}`}</span>
      </div>
      <BusiDishes dishes={dishes} />
      <div className={less.bottom}>
        <span className={less.price}>{`消费:¥${price}`}</span>
        <div className={less.buttons}>
          <div className={less.cancel} onClick={() => cancelOrder(oid)}>
            <span>取消订单</span>
          </div>
          <div className={less.finish} onClick={() => finishOrder(oid)}>
            <span>完成订单</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusiOrder;
