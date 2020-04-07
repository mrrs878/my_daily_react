import React, { useContext, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { RootContext } from '@/store';
import MTabBar from '@/components/MTabBar';
import getUserModule from '@/module/user';

type PropsI = RouteComponentProps;

const App: React.FC<PropsI> = (props: PropsI) => {
  window.onNavBarLeftClick = () => {
    props.history.goBack();
  };

  const rootContext = useContext(RootContext);
  const UserModule = getUserModule(rootContext)();
  useEffect(() => {
    Promise.all([UserModule.getUserInfo()]).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e);
    });
  }, []);
  return <MTabBar />;
};

export default withRouter(App);
