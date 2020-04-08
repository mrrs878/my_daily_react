import React, { useContext, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Card, Icon, NavBar, PullToRefresh, Toast, Modal,
} from 'antd-mobile';
import { RootContext } from '@/store';
import Task from '@/model/Task';
import getTaskModule from '@/module/task';
import { RES_CODE, TASK_STATUS, TASK_STATUS_VIEW } from '@/constant';
import style from './index.module.css';

interface PropsI extends RouteComponentProps<{ id: string }>{
}
const Index: React.FC<PropsI> = (props: PropsI) => {
  const [refreshing, setRefreshing] = useState(false);
  const [task, setTask] = useState<TaskI>(new Task());
  const rootContext = useContext(RootContext);
  const TaskModule = getTaskModule(rootContext)();
  useEffect(() => {
    const { id } = props.match.params;
    setTask(rootContext.state.tasks[Number(id)]);
  }, [props.match.params, rootContext.state.tasks]);

  async function onRefresh() {
    try {
      setRefreshing(true);
      const res = await TaskModule.refreshTask(task.ID);
      setRefreshing(false);
      Toast.info(res.code === RES_CODE.success ? '刷新成功' : res.msg);
    } catch (e) {
      console.log(e);
    }
  }

  function onDelTaskClick() {}
  function onUpdateTaskClick(status: TASK_STATUS) {
    console.log(status);
    Modal.alert('提示', `确定任务在${TASK_STATUS_VIEW[status]}吗？`, [
      {
        text: '取消',
      },
      {
        text: '确定',
        async onPress() {
          try {
            const res = await TaskModule.updateTaskStatus(task.ID, status);
            Toast.info(res.code === RES_CODE.success ? '更新成功' : res.msg);
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  }

  return (
    <div className="container">
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={onNavBarLeftClick}>
        任务详情
      </NavBar>
      <PullToRefresh
        getScrollContainer={() => null}
        damping={60}
        indicator={{}}
        distanceToRefresh={window.devicePixelRatio * 25}
        direction="down"
        refreshing={refreshing}
        onRefresh={onRefresh}
      >
        <Card full>
          <Card.Header
            title={task.title}
            extra={TASK_STATUS_VIEW[task.status]}
          />
          <Card.Body className={style.cardBody}>{ task.detail }</Card.Body>
          <Card.Footer content={(
            <div className={style.buttonsGroup}>
              {task.status !== TASK_STATUS.cancel
              && <Button className={style.button} size="small" type="warning" onClick={onDelTaskClick}>删除</Button>}
              {task.status !== TASK_STATUS.running
              && (
              <Button
                className={style.button}
                size="small"
                type="primary"
                onClick={() => onUpdateTaskClick(TASK_STATUS.running)}
              >
                进行中
              </Button>
              )}
              {task.status !== TASK_STATUS.complete
              && (
              <Button
                className={style.button}
                size="small"
                type="primary"
                onClick={() => onUpdateTaskClick(TASK_STATUS.complete)}
              >
                完成
              </Button>
              )}
            </div>
          )}
          />
          <div className="divider">
            更新时间:
            { task.UpdatedAt || task.CreatedAt }
          </div>
        </Card>
      </PullToRefresh>
    </div>
  );
};

export default withRouter(Index);
