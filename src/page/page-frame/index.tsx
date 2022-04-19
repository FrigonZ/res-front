/** 内容页面框架 */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import IconLink from '../../components/icon-link';
import { IMAGE } from '../../constant/image';
import { State } from '../../constant/store';
import { getDate } from '../../utils/time';
import { getRouteName, routers } from '../route';
import { useLogOut, useStopBusi } from './hooks';
import less from './page-frame.module.less';

export interface Props {
  children?: React.ReactNode;
}

const PATH = '/';

/** 内容页面框架 */
function PageFrame({ children = null }:Props) {
  const logOut = useLogOut();
  const location = useLocation();
  const { isLogin } = useSelector((state: State) => state.user);
  const { isRunning } = useSelector((state: State) => state.busi);
  const stopBusi = useStopBusi();
  const date = getDate();

  const image = isRunning ? IMAGE.START_RES : IMAGE.PAUSE_RES;
  const title = isRunning ? '营业中' : '暂停营业';

  return isLogin ? (
    <div className={less.wrap}>
      <div className={less.left}>
        <div className={less.status}>
          <img alt={title} src={image} />
          <h1>
            {title}
          </h1>
          <h2>
            {date}
          </h2>
        </div>
        <div className={less.links}>
          {routers.map((page) => (
            <IconLink key={page.path} to={page.path} icon={page.icon} hint={page.name} />
          ))}
        </div>
        <div className={less.quit} onClick={logOut}>
          <img src={IMAGE.LOG_OUT} alt="logout" />
          <div>
            <span className={less.username}>username</span>
            <span className={less.logout}>退出</span>
          </div>
        </div>
      </div>
      <div className={less.right}>
        <div className={less.head}>
          <div className={less.title}>
            {getRouteName(location.pathname)}
          </div>
          <div className={less.orderwrap}>
            <Link to={PATH}>
              <div className={less.checkorder}>
                <span>查看订单</span>
              </div>
            </Link>
            <div className={less.ordernum}>
              <span>0</span>
            </div>
          </div>
        </div>
        <div className={less.container}>
          {children}
        </div>
      </div>
      {
        isRunning ? (
          <div className={less.fix}>
            <div onClick={stopBusi}>
              <img alt="close" src={IMAGE.CLOSE} />
              <span>暂停营业</span>
            </div>
          </div>
        ) : null
      }
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default PageFrame;
