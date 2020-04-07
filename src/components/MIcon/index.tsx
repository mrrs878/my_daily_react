import React from 'react';

import style from './index.module.css';

interface PropsI {
  iconName: string;
}
const MIcon: React.FC<PropsI> = (props: PropsI) => {
  const { iconName } = props;
  return (
    <svg className={style.icon} aria-hidden="true">
      <use xlinkHref={`#${iconName}`} />
    </svg>
  );
};

export default MIcon;
