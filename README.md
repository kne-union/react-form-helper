
# react-form-helper


### 描述

react-form的辅助工具包


### 安装

```shell
npm i --save @kne/react-form-helper
```


### 概述

桥接UI组件库的Form输入组件和@kne/react-form


### 示例(全屏)

#### 示例代码

- 基本示例
- 简单的form到input组件的绑定
- _ReactFormHelper(@kne/current-lib_react-form-helper),antd(antd),_ReactForm(@kne/react-form),remoteLoader(@kne/remote-loader)

```jsx
const { createWithRemoteLoader } = remoteLoader;
const { hooks, widget, utils } = _ReactFormHelper;
const { default: Form, useSubmit } = _ReactForm;
const { Input: InputField, Button, Flex } = antd;

const { useDecorator } = hooks;
const { EnterSubmit, FormStore, ScrollToError } = widget;

const Input = (props) => {
  const render = useDecorator(Object.assign({ placeholder: `请输入${props.label}` }, props));
  return render(InputField);
};

const SubmitButton = ({ type = 'primary', realTime, realtime, disabled = false, ...props }) => {
  const { isPass, isLoading, ...submitProps } = useSubmit(props);
  if (typeof realTime === 'boolean') {
    console.error(`warning: realTime参数已废弃，请使用realtime，后续版本可能回删除realTime的支持`);
  }
  return (<Button type={type} loading={isLoading}
                  disabled={disabled || (realtime ? !isPass : false)} {...props} {...submitProps} />);
};

const BaseExample = createWithRemoteLoader({
  modules: ['InfoPage', 'Modal@useConfirmModal']
})(({ remoteModules }) => {
  const [InfoPage, useConfirmModal] = remoteModules;
  const modal = useConfirmModal();
  const formInner = <Flex vertical gap="middle">
    <Input name="name" label="名称" rule="REQ LEN-0-10" />
    <Input name="email" label="邮箱" rule="REQ EMAIL" />
    <SubmitButton>提交</SubmitButton>
  </Flex>;
  return <InfoPage>
    <InfoPage.Part title="简单表单">
      <Form onSubmit={(data) => {
        modal({
          type: 'info', message: JSON.stringify(data, null, 2)
        });
      }}>
        {formInner}
      </Form>
    </InfoPage.Part>
    <InfoPage.Part title="自动滚动到错误位置">
      <Form onSubmit={(data) => {
        modal({
          type: 'info', message: JSON.stringify(data, null, 2)
        });
      }} onError={(errors) => {
        modal({
          type: 'error',
          message: JSON.stringify(errors.map((item) => ({ label: item.label, errMsg: item.errMsg })), null, 2)
        });
      }}>
        <ScrollToError />
        {formInner}
      </Form>
    </InfoPage.Part>
    <InfoPage.Part title="回车提交表单">
      <Form onSubmit={(data) => {
        modal({
          type: 'info', message: JSON.stringify(data, null, 2)
        });
      }} onError={(errors) => {
        modal({
          type: 'error',
          message: JSON.stringify(errors.map((item) => ({ label: item.label, errMsg: item.errMsg })), null, 2)
        });
      }}>
        <EnterSubmit>
          {formInner}
        </EnterSubmit>
      </Form>
    </InfoPage.Part>
    <InfoPage.Part title="表单缓存">
      <Form onSubmit={(data) => {
        modal({
          type: 'info', message: JSON.stringify(data, null, 2)
        });
      }} onError={(errors) => {
        modal({
          type: 'error',
          message: JSON.stringify(errors.map((item) => ({ label: item.label, errMsg: item.errMsg })), null, 2)
        });
      }}>
        <FormStore cache="test-form-cache" />
        <EnterSubmit>
          {formInner}
        </EnterSubmit>
      </Form>
    </InfoPage.Part>
  </InfoPage>;
});

render(<BaseExample />);

```


### API


