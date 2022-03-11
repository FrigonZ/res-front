import { Button } from 'antd';
import React from 'react';
import CreateModal from '../../components/create-modal.tsx';
import { useOpenModal } from './hooks';

function Dish() {
  const openModal = useOpenModal();

  return (
    <div>
      <Button type="primary" onClick={openModal}>新增餐品</Button>
      <CreateModal />
    </div>
  );
}

export default Dish;
