import {
  Form, Input, Modal, Radio,
} from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DishProps } from '../../constant/entity';
import { State } from '../../constant/store';
import FileUpload from '../file-upload';
import { useCloseModal, useSubmit } from './hooks';

const initialValue = {
  isNecessary: 0,
};

function CreateModal() {
  const { createModalVisible } = useSelector((state: State) => state.dish);
  const closeModal = useCloseModal();
  const [form] = Form.useForm();
  const [url, setUrl] = useState('');
  const doSubmit = useSubmit();

  const handleSubmit = async () => {
    const dish: DishProps = {
      ...form.getFieldsValue(),
      pic: url,
      isNecessary: Boolean(form.getFieldValue('isNecessary')),
    };
    const isSuccess = await doSubmit([dish]);
    if (isSuccess) {
      handleClose();
    }
  };

  const handleClose = () => {
    closeModal();
    form.resetFields();
    setUrl('');
  };

  return (
    <Modal
      title="新增餐品"
      visible={createModalVisible}
      onOk={handleSubmit}
      onCancel={handleClose}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValue}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入餐品名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="价格"
          rules={[{ required: true, message: '请输入餐品价格' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="desc"
          label="描述"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="isNecessary"
          label="比选品"
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="图片">
          <FileUpload url={url} setUrl={setUrl} style={{ width: 120, height: 120 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateModal;
