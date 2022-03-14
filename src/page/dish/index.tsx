import { Button } from 'antd';
import React, { useEffect } from 'react';
import CreateModal from '../../components/create-modal';
import DishTable from '../../components/dish-table';
import { useFetchDishes, useOpenModal } from './hooks';

function Dish() {
  const openModal = useOpenModal();
  const fetchDishes = useFetchDishes();

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  return (
    <div>
      <Button type="primary" onClick={openModal}>新增餐品</Button>
      <CreateModal />
      <DishTable />
    </div>
  );
}

export default Dish;
