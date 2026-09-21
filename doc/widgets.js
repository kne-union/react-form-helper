const { createWithRemoteLoader } = remoteLoader;
const { hooks, widget } = _ReactFormHelper;
const { default: Form, useSubmit } = _ReactForm;
const { Input: InputField, Button, Flex, Alert, Space } = antd;

const { useDecorator, useCacheRemove } = hooks;
const { EnterSubmit, FormStore, ScrollToError } = widget;

const Input = props => {
  const render = useDecorator(Object.assign({ placeholder: `请输入${props.label}` }, props));
  return render(InputField);
};

const SubmitButton = ({ type = 'primary', ...props }) => {
  const { isLoading, ...submitProps } = useSubmit(props);
  return <Button type={type} loading={isLoading} {...props} {...submitProps} />;
};

const ClearCacheButton = () => {
  const removeCache = useCacheRemove();
  return (
    <Button
      onClick={() => {
        removeCache();
        window.location.reload();
      }}
    >
      清除缓存并刷新
    </Button>
  );
};

const tallStyle = { maxHeight: 180, overflow: 'auto', border: '1px solid #f0f0f0', padding: 12 };

const WidgetsExample = createWithRemoteLoader({
  modules: ['InfoPage', 'Modal@useConfirmModal']
})(({ remoteModules }) => {
  const [InfoPage, useConfirmModal] = remoteModules;
  const modal = useConfirmModal();
  const onSubmit = data => modal({ type: 'info', message: JSON.stringify(data, null, 2) });
  const onError = errors =>
    modal({
      type: 'error',
      message: JSON.stringify(
        errors.map(item => ({ label: item.label, errMsg: item.errMsg })),
        null,
        2
      )
    });

  const fields = (
    <Flex vertical gap="middle">
      <Input name="name" label="姓名" rule="REQ LEN-0-10" />
      <Input name="email" label="邮箱" rule="REQ EMAIL" />
      <SubmitButton>提交</SubmitButton>
    </Flex>
  );

  return (
    <InfoPage>
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="表单 Widget"
        description="ScrollToError：提交失败滚到首个错误；EnterSubmit：回车触发提交；FormStore + useCacheRemove：本地缓存草稿与清除。"
      />

      <InfoPage.Part title="ScrollToError">
        <div style={tallStyle}>
          <Form onSubmit={onSubmit} onError={onError}>
            <ScrollToError scrollProps={{ block: 'center' }} />
            <div style={{ height: 120 }} />
            {fields}
          </Form>
        </div>
      </InfoPage.Part>

      <InfoPage.Part title="EnterSubmit">
        <Form onSubmit={onSubmit} onError={onError}>
          <EnterSubmit>
            <Flex vertical gap="middle" style={{ maxWidth: 420 }}>
              <Input name="keyword" label="关键词" rule="REQ" />
              <Input name="remark" label="备注" />
              <SubmitButton>提交（也可在输入框回车）</SubmitButton>
            </Flex>
          </EnterSubmit>
        </Form>
      </InfoPage.Part>

      <InfoPage.Part title="FormStore + useCacheRemove">
        <Alert type="warning" showIcon style={{ marginBottom: 12 }} message="修改下方字段后刷新页面，应恢复草稿；提交成功或点清除缓存会删除。" />
        <Form onSubmit={onSubmit} onError={onError}>
          <FormStore cache="helper-doc-form-store" />
          <EnterSubmit>
            <Flex vertical gap="middle" style={{ maxWidth: 420 }}>
              <Input name="draftTitle" label="草稿标题" rule="REQ" />
              <Input name="draftContent" label="草稿内容" />
              <Space>
                <SubmitButton>提交（成功清缓存）</SubmitButton>
                <ClearCacheButton />
              </Space>
            </Flex>
          </EnterSubmit>
        </Form>
      </InfoPage.Part>
    </InfoPage>
  );
});

render(<WidgetsExample />);
