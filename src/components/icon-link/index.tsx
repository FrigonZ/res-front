import { Tooltip } from 'antd';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import less from './icon-link.module.less';

interface Props {
  to: string,
  icon: string,
  hint: string,
}

function IconLink({ to, icon, hint }: Props) {
  const isSelected = useMatch({
    path: to,
    end: true,
    caseSensitive: true,
  });
  return (
    <div className={less.relative}>
      <div className={isSelected ? less.selected : less.wrap}>
        <Link to={to}>
          <Tooltip title={hint} placement="right">
            <img className={less.image} src={icon} alt={hint} />
          </Tooltip>
        </Link>
      </div>
      {isSelected ? <div className={less['selected-bar']} /> : null}
    </div>
  );
}

export default IconLink;
