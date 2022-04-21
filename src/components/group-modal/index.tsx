import { Input, Modal, Tag } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../constant/store';
import { useCloseModal, useCreateGroup } from './hooks';
import less from './group-modal.module.less';

function GroupModal() {
  const { groupModalVisible, groups } = useSelector((state:State) => state.dish);
  const input = useRef<Input>(null);

  const closeModal = useCloseModal();
  const createGroup = useCreateGroup(input);

  return (
    <Modal
      title="分组管理"
      visible={groupModalVisible}
      onOk={closeModal}
      onCancel={closeModal}
    >
      <Search enterButton="新增" placeholder="新分组名" ref={input} onSearch={createGroup} />
      <div className={less.tags}>
        {groups.map((group) => <Tag key={group.gid} color="orange">{group.name}</Tag>)}
      </div>
    </Modal>
  );
}

export default GroupModal;
