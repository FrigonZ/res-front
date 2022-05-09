/** 餐品页 */
import { Button, Input } from 'antd';
import React, { useEffect, useRef } from 'react';
import Search from 'antd/lib/input/Search';
import CreateModal from '../../components/create-modal';
import DishTable from '../../components/dish-table';
import {
  useFetchDishes,
  useFetchGroups,
  useHandleSearch,
  useOpenDiscountModal,
  useOpenGroupModal,
  useOpenModal,
  useReset,
} from './hooks';
import less from './dish.module.less';
import GroupModal from '../../components/group-modal';
import DiscountModal from '../../components/discount-modal';

/** 餐品页 */
function Dish() {
  const search = useRef<Input>(null);
  const openModal = useOpenModal();
  const fetchDishes = useFetchDishes();
  const fetchGroups = useFetchGroups();
  const fetchDiscounts = useFetchDishes();
  const handleSearch = useHandleSearch();
  const reset = useReset(search);
  const openGroupModal = useOpenGroupModal();
  const openDiscountModal = useOpenDiscountModal();

  useEffect(() => {
    fetchDishes();
    fetchGroups();
    fetchDiscounts();
  }, [fetchDishes, fetchGroups, fetchDiscounts]);

  return (
    <div className={less.wrap}>
      <div className={less.top}>
        <div className={less.group}>
          <Search className={less.search} ref={search} placeholder="餐品名" onSearch={handleSearch} />
          <Button onClick={reset}>重置</Button>
        </div>
        <div className={less.group}>
          <Button onClick={openDiscountModal}>满减管理</Button>
          <Button onClick={openGroupModal}>类别管理</Button>
          <Button type="primary" onClick={openModal}>新增餐品</Button>
        </div>
      </div>
      <CreateModal />
      <GroupModal />
      <DiscountModal />
      <DishTable />
    </div>
  );
}

export default Dish;
