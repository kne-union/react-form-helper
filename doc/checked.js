const { createWithRemoteLoader } = remoteLoader;
const { hooks, hoc } = _ReactFormHelper;
const { default: Form, useSubmit } = _ReactForm;
const { Checkbox: CheckboxField, Switch: SwitchField, Button, Flex, Alert } = antd;

const { useDecorator } = hooks;
const { withChecked } = hoc;

const CheckboxUI = withChecked(CheckboxField);
const SwitchUI = withChecked(SwitchField);

const Checkbox = props => {
  const render = useDecorator(props);
  return render(CheckboxUI);
};

const Switch = props => {
  const render = useDecorator(props);
  return render(SwitchUI);
};

const SubmitButton = ({ type = 'primary', ...props }) => {
  const { isLoading, ...submitProps } = useSubmit(props);
  return <Button type={type} loading={isLoading} {...props} {...submitProps} />;
};

const CheckedExample = createWithRemoteLoader({
  modules: ['InfoPage', 'Modal@useConfirmModal']
})(({ remoteModules }) => {
  const [InfoPage, useConfirmModal] = remoteModules;
  const modal = useConfirmModal();

  return (
    <InfoPage>
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="withChecked"
        description="antd Checkbox / Switch 使用 checked，表单字段使用 value。withChecked 把 value 映射为 checked，再交给 useDecorator。"
      />
      <InfoPage.Part title="Checkbox / Switch">
        <Form
          data={{ agree: false, notify: true }}
          onSubmit={data => modal({ type: 'info', message: JSON.stringify(data, null, 2) })}
        >
          <Flex vertical gap="middle" style={{ maxWidth: 420 }}>
            <Checkbox name="agree" label="同意协议" rule="REQ">
              我已阅读并同意用户协议
            </Checkbox>
            <Switch name="notify" label="消息通知" />
            <SubmitButton>提交</SubmitButton>
          </Flex>
        </Form>
      </InfoPage.Part>
    </InfoPage>
  );
});

render(<CheckedExample />);
