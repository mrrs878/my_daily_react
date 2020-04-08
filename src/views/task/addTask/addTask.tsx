import React, { useState, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  DatePicker,
  Icon, InputItem, List, Modal, NavBar, Tag, TextareaItem, Toast,
} from 'antd-mobile';
import { createForm, PropsWithForm, ValidateErrors } from 'rc-form';
import Task from '@/model/Task';
import MIcon from '@/components/MIcon';
import { RootContext } from '@/store';
import getTaskModule from '@/module/task';
import { RES_CODE } from '@/constant';
import style from './index.module.css';

interface PropsI extends PropsWithForm<any, any>, RouteComponentProps{
}

const now = new Date();
const maxDate = new Date(`${now.getFullYear()}/12/31 23:59:59`);

const AddTask: React.FC<PropsI> = (props: PropsI) => {
  const [tags, setTags] = useState<Array<string>>([]);
  const rootContext = useContext(RootContext);
  const TaskModule = getTaskModule(rootContext)();

  const { form } = props;
  const titleItemProps = form.getFieldProps('title', {
    rules: [
      { required: true, message: '请输入任务名称' },
    ],
  });
  const detailItemProps = form.getFieldProps('detail', {
    rules: [
      { required: true, message: '请输入任务详情' },
    ],
  });
  const alarmTimeItemProps = form.getFieldProps('alarmTime', {
    initialValue: now,
  });

  function onSubmit() {
    form.validateFields({ force: true }, async (error: ValidateErrors) => {
      if (!error) {
        const { title, detail, alarmTime } = props.form.getFieldsValue();
        const label = tags.join('#');
        const task = new Task(title, detail, label, alarmTime.getTime());
        const res = await TaskModule.addTask(task);
        Toast.info(res.code === RES_CODE.success ? '添加成功' : res.msg);
        if (res.code === RES_CODE.success) props.history.goBack();
      } else {
        Toast.info(error?.detail?.errors[0]?.message);
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }
  function onAddTagClick() {
    Modal.prompt('添加标签', '请输入标签名',
      [
        {
          text: '取消',
          onPress: () => new Promise((resolve) => {
            resolve();
          }),
        },
        {
          text: '添加',
          onPress: (value) => new Promise((resolve) => {
            setTags([...tags, value]);
            resolve();
          }),
        },
      ], 'default', '', ['标签名']);
  }
  function onRemoveTagClick(index: number) {
    const tmp = [...tags];
    tmp.splice(index, 1);
    setTags(tmp);
  }

  return (
    <div className="container">
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={onNavBarLeftClick}>
        添加任务
      </NavBar>
      <List>
        <InputItem
          ref={titleItemProps.ref}
          value={titleItemProps.value}
          onChange={titleItemProps.onChange}
          placeholder="请输入任务名称"
          maxLength={16}
          clear
        >
          任务名称
        </InputItem>
        <TextareaItem
          ref={detailItemProps.ref}
          value={detailItemProps.value}
          onChange={detailItemProps.onChange}
          placeholder="请输入任务详情"
          clear
          autoHeight
          title="任务详情"
        >
          任务详情
        </TextareaItem>
        <DatePicker
          title="提醒时间"
          value={alarmTimeItemProps.value}
          onChange={alarmTimeItemProps.onChange}
          minDate={now}
          maxDate={maxDate}
          className={style.datePicker}
        >
          <List.Item arrow="horizontal">提醒时间</List.Item>
        </DatePicker>
        <List.Item
          extra={(
            <div className={style.extraContainer}>
              <div className={style.tagContainer}>
                {
                  tags.map((item, index) => (
                    <Tag
                      key={item}
                      className={style.tag}
                      closable
                      onClose={() => onRemoveTagClick(index)}
                    >
                      { item }
                    </Tag>
                  ))
                }
              </div>
              {
                tags.length < 3 && <MIcon iconName="add" onClick={onAddTagClick} />
              }
            </div>
          )}
        >
          标签
        </List.Item>
      </List>
      <Button type="primary" className="position-bottom" onClick={onSubmit}>添加任务</Button>
    </div>
  );
};

export default createForm<React.FC<PropsI>>()(withRouter(AddTask));
