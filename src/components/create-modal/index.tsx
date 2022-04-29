/** [container]新增餐品弹窗容器 */
import {
  Button,
  Form, Input, Modal, Radio, Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../constant/store';
import { useSetEditDishId, useSetInialDish } from '../../store/dish/hooks';
import {
  format2Dish,
  getDraft,
  removeDraft,
  setDraft,
} from '../../utils/draft';
import FileUpload from '../file-upload';
import OptionParser from '../option-parser';
import { useCloseModal, useEdit, useSubmit } from './hooks';
import less from './create-modal.module.less';

const initialValue = {
  isNecessary: 0,
};

/** [container]新增餐品弹窗容器 */
function CreateModal() {
  const {
    createModalVisible, initialDish, editId, groups,
  } = useSelector((state: State) => state.dish);
  const closeModal = useCloseModal();
  const [form] = Form.useForm();
  const [url, setUrl] = useState('');
  const [options, setOptions] = useState([]);
  const [editOp, setEditOp] = useState({
    options: [],
  });
  const doSubmit = useSubmit();
  const doEdit = useEdit();
  const setInitialDish = useSetInialDish();
  const setEditId = useSetEditDishId();

  useEffect(() => {
    if (!createModalVisible) return;
    const defaultValue = editId ? initialDish : getDraft();

    if (defaultValue) {
      form.setFieldsValue(defaultValue);
      setUrl(defaultValue.pic || '');
      setOptions(defaultValue.options as any || []);
      setEditOp({
        options: defaultValue.options as any || [],
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createModalVisible]);

  /** 提交表单 */
  const handleSubmit = async () => {
    const prefix = editId ? initialDish : {};
    const dish = format2Dish({
      ...prefix,
      ...form.getFieldsValue(),
      pic: url,
      options,
      did: editId || undefined,
    });
    const handler = editId ? doEdit : doSubmit;
    const isSuccess = await handler(dish);

    // 请求成功后关闭弹窗
    if (isSuccess) {
      handleClose();
      if (editId) {
        setInitialDish(null);
      } else {
        removeDraft();
      }
    }
  };

  const handleReset = () => {
    form.resetFields();
    setUrl('');
    setOptions([]);
    setEditOp({
      options: [],
    });
  };

  /** 关闭弹窗并重置表单 */
  const handleClose = () => {
    const draft = {
      ...form.getFieldsValue(),
      pic: url,
      options,
    };
    if (!editId) {
      setDraft(draft);
    }
    setEditId('');
    closeModal();
    form.resetFields();
    setUrl('');
    setOptions([]);
    setEditOp({
      options: [],
    });
  };

  const confirmOptions = () => {
    setOptions(editOp.options);
  };

  return (
    <Modal
      title="新增餐品"
      visible={createModalVisible}
      onOk={handleSubmit}
      onCancel={handleClose}
      footer={editId ? [
        <Button key="back" onClick={handleClose}>
          返回
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          提交
        </Button>,
      ] : [
        <Button key="back" onClick={handleClose}>
          返回
        </Button>,
        <Button key="reset" onClick={handleReset}>
          重置
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          提交
        </Button>,
      ]}
    >
      <div className={less.wrap}>
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
            name="group"
            label="分组"
          >
            <Select>
              <Select.Option value={-1}>无分类</Select.Option>
              {groups.map((group) => (
                <Select.Option key={group.gid} value={group.gid}>{group.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="desc"
            label="描述"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="isNecessary"
            label="必选品"
          >
            <Radio.Group>
              <Radio value={0}>否</Radio>
              <Radio value={1}>是</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="图片">
            <FileUpload url={url} setUrl={setUrl} style={{ width: 120, height: 120 }} />
          </Form.Item>
          <Form.Item label="自定义">
            <OptionParser data={editOp} onEdit={setEditOp as any} onConfirm={confirmOptions} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default CreateModal;
