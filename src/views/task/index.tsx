import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, PullToRefresh } from 'antd-mobile';
import { ROUTES_MAP } from '../../router';

type PropsI = RouteComponentProps;

const Task: React.FC<PropsI> = (props: PropsI) => {
  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }

  function onAddTaskClick() {
    props.history.push(ROUTES_MAP.addTask);
  }

  return (
    <div className="container">
      <PullToRefresh
        getScrollContainer={() => null}
        damping={60}
        indicator={{}}
        distanceToRefresh={window.devicePixelRatio * 25}
        direction="down"
        refreshing={refreshing}
        onRefresh={onRefresh}
      >
        this is task page
      </PullToRefresh>
      <Button type="primary" onClick={onAddTaskClick}>添加任务</Button>
    </div>
  );
};

export default withRouter(Task);
