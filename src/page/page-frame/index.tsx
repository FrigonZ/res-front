import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Link, Navigate,
} from 'react-router-dom';
import { State } from '../../constant/store';
import { routers } from '../route';
import { useLogOut } from './hooks';

export interface Props {
  children?: React.ReactNode;
}

function PageFrame({ children = null }:Props) {
  const logOut = useLogOut();
  const { isLogin } = useSelector((state: State) => state.user);
  return isLogin ? (
    <>
      {routers.map((page) => (
        <Link to={page.path}>{page.name}</Link>
      ))}
      <Button onClick={logOut}>退出</Button>
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default PageFrame;
