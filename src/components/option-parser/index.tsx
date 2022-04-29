import { Button, message } from 'antd';
import React from 'react';
import ReactJson from 'react-json-view';
import { DishOption } from '../../constant/entity';
import { checkoutOption } from '../../utils/dish';
import less from './option-parser.module.less';

interface Props {
  data: { options: DishOption[] };
  onEdit?: (data: any) => void | undefined;
  onConfirm?: () => void | undefined;
}

function OptionParser(props: Props) {
  const { data, onEdit, onConfirm } = props;

  const isOption = data.options?.every((option) => checkoutOption(option));

  const handleEdit = onEdit ? (e: any) => onEdit(e.updated_src as any) : false;

  const add = () => (onEdit ? onEdit({
    options: [
      ...data.options || [],
      {
        group: 'name',
        content: {
          item: 0,
        },
      },
    ],
  }) : () => null);

  const confirm = () => {
    if (!onEdit || !isOption) {
      message.error('格式错误');
      return;
    }

    message.success('修改成功');
    onConfirm?.();
  };

  return (
    <div>
      <div className={less.wrap}>
        <ReactJson
          src={data}
          name="data"
          onEdit={handleEdit}
          onAdd={handleEdit}
          onDelete={handleEdit}
        />
      </div>
      {
        onEdit ? (
          <div className={less.bottom}>
            <div>{isOption ? '可提交' : '格式错误'}</div>
            <div>
              <Button onClick={add} size="small">新增分组</Button>
              <Button onClick={confirm} size="small">确定修改</Button>
            </div>
          </div>
        ) : null
      }
    </div>
  );
}

OptionParser.defaultProps = {
  onEdit: undefined,
  onConfirm: undefined,
};

export default OptionParser;
