import {
  Button, Input, Modal, Tag,
} from 'antd';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { State } from '../../constant/store';
import { useCloseModal, useCreate, useDeleteDiscount } from './hooks';
import less from './discount-modal.module.less';
import { Discount } from '../../constant/entity';

interface Props {
  discount: Discount;
}

function DiscountTag({ discount }: Props) {
  const deleteDiscount = useDeleteDiscount();

  return (
    <Tag
      color="orange"
      closable
      onClose={() => deleteDiscount(discount.did || 0)}
    >
      {`满${discount.standard}减${discount.discount}`}
    </Tag>
  );
}

function DiscountModal() {
  const { discountModalVisible, discounts } = useSelector((state:State) => state.dish);
  const standardInput = useRef<Input>(null);
  const discountInput = useRef<Input>(null);

  const closeModal = useCloseModal();
  const createDiscount = useCreate(standardInput, discountInput);

  return (
    <Modal
      title="分组管理"
      visible={discountModalVisible}
      onOk={closeModal}
      onCancel={closeModal}
    >
      <Input.Group compact>
        <Input style={{ width: 100 }} placeholder="满减额度" type="number" ref={standardInput} />
        <Input style={{ width: 100 }} placeholder="折扣金额" type="number" ref={discountInput} />
        <Button icon={<PlusOutlined />} onClick={createDiscount} />
      </Input.Group>
      <div className={less.tags}>
        {discounts.map((discount) => <DiscountTag key={discount.did} discount={discount} />)}
      </div>
    </Modal>
  );
}

export default DiscountModal;
