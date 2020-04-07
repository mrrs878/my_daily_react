import React, { useEffect, useState } from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter, RouteComponentProps } from 'react-router';
import Waves from 'node-waves';

import './index.module.css';
import { TAB_BAR_ROUTES } from '@/router';
import MIcon from '../MIcon';

type PropsI = RouteComponentProps;

const MTabBar: React.FC<PropsI> = (props: PropsI) => {
  const [hidden, setHidden] = useState(false);
  const [selectedTab, setSelectedTab] = useState('task');

  useEffect(() => {
    Waves.init({
      duration: 1000,
      delay: 500,
    });
    Waves.attach('.am-tab-bar-tab');
  }, []);
  useEffect(() => {
    const tmp = !TAB_BAR_ROUTES.includes(props.location.pathname);
    setHidden(tmp);
  }, [props?.location?.pathname]);

  function onTabBarItemClick(path: string) {
    setSelectedTab(path);
    props.history.push(path);
  }

  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      hidden={hidden}
      noRenderContent
    >
      <TabBar.Item
        title="任务"
        key="task"
        icon={<MIcon iconName="brand" />}
        selectedIcon={<MIcon iconName="brand-fill" />}
        selected={selectedTab === 'task'}
        onPress={() => onTabBarItemClick('task')}
      />
      <TabBar.Item
        icon={<MIcon iconName="task-management" />}
        selectedIcon={<MIcon iconName="task-management-fill" />}
        title="习惯"
        key="habit"
        selected={selectedTab === 'habit'}
        onPress={() => onTabBarItemClick('habit')}
      />
      <TabBar.Item
        icon={<MIcon iconName="user" />}
        selectedIcon={<MIcon iconName="user-fill" />}
        title="我的"
        key="profile"
        badge={1}
        selected={selectedTab === 'profile'}
        onPress={() => onTabBarItemClick('profile')}
      />
    </TabBar>
  );
};

export default withRouter(MTabBar);
