/** 内容页面框架 */
import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import IconLink from '../../components/icon-link';
import { State } from '../../constant/store';
import { routers } from '../route';
import { useLogOut } from './hooks';
import less from './page-frame.module.less';

export interface Props {
  children?: React.ReactNode;
}

/** 内容页面框架 */
function PageFrame({ children = null }:Props) {
  const logOut = useLogOut();
  const { isLogin } = useSelector((state: State) => state.user);

  return isLogin ? (
    <div className={less.wrap}>
      <div className={less.left}>
        <div className={less.links}>
          {routers.map((page) => (
            <IconLink key={page.path} to={page.path} icon={page.icon} hint={page.name} />
          ))}
        </div>
        <Button type="link" onClick={logOut}>退出</Button>
      </div>
      <div className={less.right}>
        {children}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default PageFrame;
