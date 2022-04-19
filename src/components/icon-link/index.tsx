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
    <div className={isSelected ? less.selected : less.wrap}>
      <Link to={to}>
        <div className={less.flex}>
          <img className={less.image} src={icon} alt={hint} />
          <span className={less.hint}>{hint}</span>
        </div>
      </Link>
    </div>
  );
}

export default IconLink;
