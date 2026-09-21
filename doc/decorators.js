const { createWithRemoteLoader } = remoteLoader;
const { hooks } = _ReactFormHelper;
const { default: Form, useSubmit } = _ReactForm;
const { Input: InputField, Button, Flex, Alert } = antd;

const { useDecorator, useOnChange, useOnBlur } = hooks;

const BlurInput = props => {
  const render = useOnBlur(Object.assign({ placeholder: `请输入${props.label}` }, props));
  return render(InputField);
};

const ChangeInput = props => {
  const render = useOnChange(Object.assign({ placeholder: `请输入${props.label}` }, props));
  return render(InputField);
};

const RealtimeInput = props => {
  const render = useDecorator(Object.assign({ placeholder: `请输入${props.label}`, realtime: true }, props));
  return render(InputField);
};

const SubmitButton = ({ type = 'primary', ...props }) => {
  const { isLoading, ...submitProps } = useSubmit(props);
  return <Button type={type} loading={isLoading} {...props} {...submitProps} />;
};

const DecoratorsExample = createWithRemoteLoader({
  modules: ['InfoPage', 'Modal@useConfirmModal']
})(({ remoteModules }) => {
  const [InfoPage, useConfirmModal] = remoteModules;
  const modal = useConfirmModal();
  const onSubmit = data => modal({ type: 'info', message: JSON.stringify(data, null, 2) });

  return (
    <InfoPage>
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="校验时机"
        description="useOnBlur：失焦校验；useOnChange：值变化后校验；useDecorator(realtime)：带 debounce 的变更校验。"
      />

      <InfoPage.Part title="useOnBlur（失焦校验）">
        <Form onSubmit={onSubmit}>
          <Flex vertical gap="middle" style={{ maxWidth: 420 }}>
            <BlurInput name="blurName" label="姓名" rule="REQ LEN-2-10" />
            <SubmitButton>提交</SubmitButton>
          </Flex>
        </Form>
      </InfoPage.Part>

      <InfoPage.Part title="useOnChange（变更即校验）">
        <Form onSubmit={onSubmit}>
          <Flex vertical gap="middle" style={{ maxWidth: 420 }}>
            <ChangeInput name="changeEmail" label="邮箱" rule="REQ EMAIL" />
            <SubmitButton>提交</SubmitButton>
          </Flex>
        </Form>
      </InfoPage.Part>

      <InfoPage.Part title="useDecorator realtime">
        <Form onSubmit={onSubmit}>
          <Flex vertical gap="middle" style={{ maxWidth: 420 }}>
            <RealtimeInput name="rtTitle" label="标题" rule="REQ LEN-0-12" />
            <SubmitButton>提交</SubmitButton>
          </Flex>
        </Form>
      </InfoPage.Part>
    </InfoPage>
  );
});

render(<DecoratorsExample />);
