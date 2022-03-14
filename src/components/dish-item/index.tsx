import React from 'react';
import { DishProps } from '../../constant/entity';

function DishItem(props: DishProps) {
  const {
    name, price, pic, desc, isNecessary, status,
  } = props;
  return (
    <div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{pic}</div>
      <div>{desc}</div>
      <div>{isNecessary}</div>
      <div>{status}</div>
    </div>
  );
}

export default DishItem;
