import React from 'react';

import { ActivityIndicator } from 'antd-mobile';

import loadingStyle from './index.module.css';

const Loading: React.FC = () => <ActivityIndicator className={loadingStyle.loading} animating text="加载页面中..." />;

export default Loading;
