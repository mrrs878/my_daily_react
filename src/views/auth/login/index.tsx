import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  List, InputItem, Button, Icon, NavBar, Toast,
} from 'antd-mobile';
import { createForm, PropsWithForm } from 'rc-form';
import githubSvg from '@/assets/img/github.svg';

import getAuthModule from '@/module/auth';
import ToastError from '@/model/ToastError';
import { RootContext } from '@/store';
import style from './index.module.css';

interface PropsI extends RouteComponentProps, PropsWithForm<any, any> {
}

const Login = (props: PropsI) => {
  const { form } = props;
  const { getFieldProps } = form;
  const nameItemProps = getFieldProps('name');
  const passwordItemProps = getFieldProps('password');
  const rootContext = useContext(RootContext);
  const AuthModule = getAuthModule(rootContext)();

  async function onLoginBtnClick() {
    try {
      const name = nameItemProps.value;
      const password = passwordItemProps.value;
      if (!/\w/.test(name) || name === undefined) throw new ToastError('请输入用户名');
      if (!/\w/.test(password) || password === undefined) throw new ToastError('请输入密码');
      const res = await AuthModule.login({ name, password });
      if (res) {
        props.history.goBack();
      }
    } catch (e) {
      console.log('login error: ', e);
      if (e instanceof ToastError) Toast.info(e.msg);
    }
  }

  function onNavBarLeftClick() {
    props.history.goBack();
  }

  return (
    <div className={`container ${style.container}`}>
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={onNavBarLeftClick}>
        登录
      </NavBar>
      <div className={style.loginContent}>
        <List>
          <InputItem
            ref={nameItemProps.ref}
            value={nameItemProps.value}
            onChange={nameItemProps.onChange}
            placeholder="请输入账号"
            maxLength={8}
            clear
          />
          <InputItem
            ref={passwordItemProps.ref}
            value={passwordItemProps.value}
            onChange={passwordItemProps.onChange}
            placeholder="请输入密码"
            maxLength={16}
            type="password"
            clear
          />
        </List>
        <br />
        <div className={`${style.tool} padding-h`}>
          <p>注册</p>
          <p>忘记密码</p>
        </div>
        <br />
        <Button onClick={onLoginBtnClick} type="primary">登录</Button>
        <br />
        <br />
        <div className={style.loginImgContainer}>
          <img className={style.loginImg} src={githubSvg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default createForm<React.FC<PropsI>>()(withRouter(Login));
