const { createWithRemoteLoader } = remoteLoader;
const { hooks, widget } = _ReactFormHelper;
const { default: Form, useSubmit } = _ReactForm;
const { Input: InputField, Button, Flex, Radio, Space, Alert } = antd;
const { useState } = React;

const { useDecorator, useFieldProps } = hooks;
const { MaxLabelProvider, SizeProvider } = widget;

const Input = props => {
  const render = useDecorator(Object.assign({ placeholder: `请输入${props.label}` }, props));
  return render(InputField);
};

const PeekFieldProps = () => {
  const fieldProps = useFieldProps();
  return (
    <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
      useFieldProps：name={fieldProps.name}，errState={String(fieldProps.errState ?? '-')}
    </div>
  );
};

const InputWithPeek = props => {
  const render = useDecorator(Object.assign({ placeholder: `请输入${props.label}` }, props));
  return render(props => (
    <>
      <InputField {...props} />
      <PeekFieldProps />
    </>
  ));
};

const SubmitButton = ({ type = 'primary', ...props }) => {
  const { isLoading, ...submitProps } = useSubmit(props);
  return <Button type={type} loading={isLoading} {...props} {...submitProps} />;
};

const FieldUiExample = createWithRemoteLoader({
  modules: ['InfoPage', 'Modal@useConfirmModal']
})(({ remoteModules }) => {
  const [InfoPage, useConfirmModal] = remoteModules;
  const modal = useConfirmModal();
  const [size, setSize] = useState('middle');
  const onSubmit = data => modal({ type: 'info', message: JSON.stringify(data, null, 2) });

  return (
    <InfoPage>
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="字段 UI 能力"
        description="labelTips / description / important / labelHidden；MaxLabelProvider 对齐 label 列宽；SizeProvider 向控件注入 size；子控件内可用 useFieldProps。"
      />

      <InfoPage.Part title="label / description / tips">
        <Form onSubmit={onSubmit}>
          <Flex vertical gap="middle" style={{ maxWidth: 480 }}>
            <Input name="title" label="职位名称" rule="REQ" labelTips="对外展示的职位标题" description="建议不超过 30 字" important />
            <Input name="code" label="内部编码" labelHidden placeholder="隐藏 label，仅保留输入" />
            <InputWithPeek name="owner" label="负责人" rule="REQ" />
            <SubmitButton>提交</SubmitButton>
          </Flex>
        </Form>
      </InfoPage.Part>

      <InfoPage.Part title="MaxLabelProvider（label 列宽对齐）">
        <Form onSubmit={onSubmit}>
          <MaxLabelProvider minLabelWidth={72}>
            <Flex vertical gap="middle" style={{ maxWidth: 480 }}>
              <Input name="a" label="名" rule="REQ" />
              <Input name="b" label="非常长的字段标签名称" rule="REQ" />
              <Input name="c" label="部门" ignoreLabelWidth description="ignoreLabelWidth 跳过对齐" />
              <SubmitButton>提交</SubmitButton>
            </Flex>
          </MaxLabelProvider>
        </Form>
      </InfoPage.Part>

      <InfoPage.Part title="SizeProvider">
        <Space style={{ marginBottom: 12 }}>
          <Radio.Group value={size} onChange={e => setSize(e.target.value)} optionType="button" buttonStyle="solid">
            <Radio.Button value="small">small</Radio.Button>
            <Radio.Button value="middle">middle</Radio.Button>
            <Radio.Button value="large">large</Radio.Button>
          </Radio.Group>
        </Space>
        <Form onSubmit={onSubmit}>
          <SizeProvider value={{ size }}>
            <Flex vertical gap="middle" style={{ maxWidth: 420 }}>
              <Input name="sizeDemo" label="尺寸演示" rule="REQ" />
              <SubmitButton>提交</SubmitButton>
            </Flex>
          </SizeProvider>
        </Form>
      </InfoPage.Part>
    </InfoPage>
  );
});

render(<FieldUiExample />);
