/** [container]餐品表格容器 */
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { useSelector } from 'react-redux';
import { DishProps } from '../../constant/entity';
import { State } from '../../constant/store';
import less from './dish-table.module.less';
import { useSetEditMode } from './hooks';

/** 表格列属性 */
const columns: ColumnsType<DishProps> = [
  {
    key: 'name',
    dataIndex: 'name',
    title: '餐品名',
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: '价格',
  },
  {
    key: 'desc',
    dataIndex: 'desc',
    title: '描述',
  },
  {
    key: 'pic',
    dataIndex: 'pic',
    title: '图片',
    render: (url: string) => (<img className={less.img} src={url} alt="pic" />),
  },
  {
    key: 'isNecessary',
    dataIndex: 'isNecessary',
    title: '必选品',
    render: (isNecessary: boolean) => (<div>{String(isNecessary)}</div>),
  },
  // TODO: 枚举反映射
  {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
  },
  {
    key: 'options',
    dataIndex: 'options',
    title: '自定义',
  },
  {
    key: 'action',
    dataIndex: 'did',
    title: '操作',
    render: (did) => (
      <EditButton did={did} />
    ),
  },
];

interface Props {
  did: string;
}

function EditButton({ did }: Props) {
  const setEditMode = useSetEditMode();

  const handleClick = () => setEditMode(did);

  return <Button type="link" onClick={handleClick}>编辑</Button>;
}

/** [container]餐品表格容器 */
function DishTable() {
  const { dishes, isFetching } = useSelector((state: State) => state.dish);
  return (
    <div>
      {isFetching ? (
        <div>isFetching</div>
      ) : (
        <div>
          <Table
            columns={columns}
            dataSource={dishes.map((dish) => ({
              ...dish,
              key: `${dish.did}-dish`,
            }))}
          />
        </div>
      )}
    </div>
  );
}

export default DishTable;
