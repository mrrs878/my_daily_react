import React from 'react';

import style from './index.module.css';

interface PropsI {
  iconName: string;
  onClick?: (event: any) => void;
}
const MIcon: React.FC<PropsI> = (props: PropsI) => {
  const { iconName } = props;
  return (
    <svg className={style.icon} aria-hidden="true" onClick={props.onClick}>
      <use xlinkHref={`#${iconName}`} />
    </svg>
  );
};

export default MIcon;
