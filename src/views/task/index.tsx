import React, { useState, useEffect, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Button, PullToRefresh, List, Toast, SwipeAction,
} from 'antd-mobile';
import { ROUTES_MAP } from '@/router';
import getTaskModule from '@/module/task';
import { RootContext } from '@/store';
import { RES_CODE } from '@/constant';
import ToastError from '@/model/ToastError';

type PropsI = RouteComponentProps;

const Task: React.FC<PropsI> = (props: PropsI) => {
  const [refreshing, setRefreshing] = useState(false);
  const rootContext = useContext(RootContext);
  const TaskModule = getTaskModule(rootContext)();
  useEffect(() => {
    TaskModule.viewTasks().then((res) => {
      if (res.code !== RES_CODE.success) throw new ToastError(res.msg);
    }).catch((e) => {
      console.log(e);
    });
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    try {
      const res = await TaskModule.viewTasks();
      setRefreshing(false);
      Toast.info(res.code === RES_CODE.success ? '刷新成功' : res.msg);
    } catch (e) {
      console.log(e);
    }
  }

  function onAddTaskClick() {
    props.history.push(ROUTES_MAP.addTask);
  }
  function onTaskItemClick(id: number) {
    props.history.push(`${ROUTES_MAP.task}/${id}`);
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
        {
          rootContext.state.tasks.map((item, index) => (
            <SwipeAction
              key={item.CreatedAt}
              style={{ backgroundColor: 'gray' }}
              autoClose
              right={[
                {
                  text: '进行中',
                  onPress: () => console.log('cancel'),
                  style: { backgroundColor: '#108ee9', color: 'white' },
                },
                {
                  text: '删除',
                  onPress: () => console.log('delete'),
                  style: { backgroundColor: '#F4333C', color: 'white' },
                },
              ]}
              onOpen={() => console.log('global open')}
              onClose={() => console.log('global close')}
            >
              <List.Item
                key={item.CreatedAt}
                onClick={() => onTaskItemClick(index)}
                arrow="horizontal"
                extra={item.detail}
              >
                { item.title }
                <List.Item.Brief>{ new Date(item.alarmTime).toLocaleString() }</List.Item.Brief>
              </List.Item>
            </SwipeAction>
          ))
        }
      </PullToRefresh>
      <Button type="primary" onClick={onAddTaskClick}>添加任务</Button>
    </div>
  );
};

export default withRouter(Task);
