const { createWithRemoteLoader } = remoteLoader;
const { hooks } = _ReactFormHelper;
const { default: Form, useSubmit } = _ReactForm;
const { Input: InputField, Button, Flex } = antd;

const { useDecorator } = hooks;

const Input = props => {
  const render = useDecorator(Object.assign({ placeholder: `请输入${props.label}` }, props));
  return render(InputField);
};

const SubmitButton = ({ type = 'primary', realtime, disabled = false, ...props }) => {
  const { isPass, isLoading, ...submitProps } = useSubmit(props);
  return <Button type={type} loading={isLoading} disabled={disabled || (realtime ? !isPass : false)} {...props} {...submitProps} />;
};

const BaseExample = createWithRemoteLoader({
  modules: ['InfoPage', 'Modal@useConfirmModal']
})(({ remoteModules }) => {
  const [InfoPage, useConfirmModal] = remoteModules;
  const modal = useConfirmModal();

  return (
    <InfoPage>
      <InfoPage.Part title="useDecorator 绑定 antd Input">
        <Form
          onSubmit={data => {
            modal({ type: 'info', message: JSON.stringify(data, null, 2) });
          }}
        >
          <Flex vertical gap="middle" style={{ maxWidth: 420 }}>
            <Input name="name" label="姓名" rule="REQ LEN-0-20" />
            <Input name="email" label="邮箱" rule="REQ EMAIL" />
            <Input name="mobile" label="手机号" rule="REQ LEN-11-11" description="失焦后触发校验（默认行为）" />
            <SubmitButton>提交</SubmitButton>
          </Flex>
        </Form>
      </InfoPage.Part>
    </InfoPage>
  );
});

render(<BaseExample />);
