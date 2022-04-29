/** [container]餐品表格容器 */
import { Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { useSelector } from 'react-redux';
import { DishProps, DishStatus } from '../../constant/entity';
import { State } from '../../constant/store';
import { stringsifyOptions } from '../../utils/dish';
import less from './dish-table.module.less';
import {
  useGetGroupName, useGetToggleText, useSetEditMode, useToggleDishStatus,
} from './hooks';

interface Props {
  did: string;
}

function EditButton({ did }: Props) {
  const setEditMode = useSetEditMode();

  const handleClick = () => setEditMode(did);

  return <a className={less.edit} onClick={handleClick}>编辑</a>;
}

function ToggleButton({ did }: Props) {
  const toggleDishStatus = useToggleDishStatus();
  const getToggleText = useGetToggleText();

  const handleClick = () => toggleDishStatus(did);
  const text = getToggleText(did);

  return text ? (
    <a onClick={handleClick}>{text}</a>
  ) : null;
}

function GroupSpan({ gid } : { gid: number }) {
  const getGroupName = useGetGroupName();
  return (
    <span>{getGroupName(gid)}</span>
  );
}

/** [container]餐品表格容器 */
function DishTable() {
  const {
    dishes, isFetching, subDishes, groups,
  } = useSelector((state: State) => state.dish);
  const curData = subDishes.length ? subDishes : dishes;

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
      key: 'group',
      dataIndex: 'group',
      title: '分组',
      render: (gid) => <GroupSpan gid={gid} />,
      filters: [
        {
          text: '无分类',
          value: -1,
        }, ...groups.map((group) => ({
          text: group.name,
          value: group.gid,
        })),
      ],
      onFilter: (value, dish) => dish.group === value,
    },
    {
      key: 'desc',
      dataIndex: 'desc',
      title: '描述',
      render: (desc) => (
        <Tooltip title={desc}>
          <Text className={less.desc} ellipsis>{desc}</Text>
        </Tooltip>
      ),
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
      render: (status: DishStatus) => (<span>{status === DishStatus.NORMAL ? '正常' : '下架'}</span>),
    },
    {
      key: 'options',
      dataIndex: 'options',
      title: '自定义',
      render: (options) => (options?.length ? (
        <Tooltip title={stringsifyOptions(options, true)}>
          <a>查看</a>
        </Tooltip>
      ) : <span>无</span>),
    },
    {
      key: 'action',
      dataIndex: 'did',
      title: '操作',
      render: (did) => (
        <div>
          <EditButton did={did} />
          <ToggleButton did={did} />
        </div>
      ),
    },
  ];

  return (
    <div>
      {isFetching ? (
        <div>isFetching</div>
      ) : (
        <div>
          <Table
            columns={columns}
            dataSource={curData.map((dish) => ({
              ...dish,
              key: `${dish.did}-dish`,
            }))}
            size="small"
            pagination={{
              defaultPageSize: 8,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default DishTable;
