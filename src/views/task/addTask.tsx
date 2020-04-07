import React from 'react';
import { Icon, NavBar } from 'antd-mobile';

const AddTask: React.FC = () => (
  <div className="container">
    <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={onNavBarLeftClick}>
      添加任务
    </NavBar>
    this is addTask Page
  </div>
);

export default AddTask;
