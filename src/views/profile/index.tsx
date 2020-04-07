import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { List } from 'antd-mobile';

import userSvg from '@/assets/img/user.svg';
import { ROUTES_MAP } from '@/router';
import { RootContext } from '@/store';

type PropsI = RouteComponentProps;

const Profile = (props: PropsI) => {
  const { state } = useContext(RootContext);

  function onLoginClick() {
    if (state.user.token) return;
    props.history.push(ROUTES_MAP.login);
  }
  return (
    <div className="container">
      <List.Item
        arrow="horizontal"
        multipleLine
        style={{ height: '2.5rem' }}
        onClick={onLoginClick}
        thumb={userSvg}
      >
        { state.user.name || '点击登录' }
      </List.Item>
      <br />
      <List.Item arrow="horizontal" onClick={() => {}}>
        消息中心
      </List.Item>
      <List.Item arrow="horizontal" onClick={() => {}}>
        图表分析
      </List.Item>
      <List.Item arrow="horizontal" onClick={() => {}}>
        设置
      </List.Item>
      <List.Item arrow="horizontal" onClick={() => {}}>
        关于
      </List.Item>
    </div>
  );
};

export default withRouter(Profile);
