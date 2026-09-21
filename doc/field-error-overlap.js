const { createWithRemoteLoader } = remoteLoader;
const { hooks } = _ReactFormHelper;
const { default: Form, useSubmit, useFormContext } = _ReactForm;
const { Input: InputField, Button, Flex, Card, Alert, Divider } = antd;
const { useEffect, useRef } = React;

const { useDecorator } = hooks;

const Input = props => {
  const render = useDecorator(Object.assign({ placeholder: `请输入${props.label}` }, props));
  return render(InputField);
};

const SubmitButton = ({ type = 'primary', realtime, disabled = false, ...props }) => {
  const { isPass, isLoading, ...submitProps } = useSubmit(props);
  return <Button type={type} loading={isLoading} disabled={disabled || (realtime ? !isPass : false)} {...props} {...submitProps} />;
};

const AutoSubmit = () => {
  const formApi = useFormContext();
  const doneRef = useRef(false);
  useEffect(() => {
    if (doneRef.current) return;
    const t = setTimeout(() => {
      doneRef.current = true;
      formApi.emitter?.emit('form:submit');
    }, 100);
    return () => clearTimeout(t);
  }, [formApi]);
  return null;
};

const LONG_ERR =
  '该字段校验未通过：请检查输入内容是否符合业务规范，包括字符长度、格式要求以及与其它字段的联动约束；若问题持续存在，请联系管理员并附上当前表单截图以便排查。';

const BaseExample = createWithRemoteLoader({
  modules: ['InfoPage']
})(({ remoteModules }) => {
  const [InfoPage] = remoteModules;

  return (
    <InfoPage>
      <div style={{ maxWidth: 420 }}>
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          message="验收要点"
          description="未报错间距为基线；单行报错净间距应接近未报错且不重叠；多行报错只把下一 Field 顶开，红字不得盖住下一 Field。"
        />

        <Flex vertical gap={24}>
          <Card title="1. 未报错" size="small">
            <Form data={{ okA: 'demo', okB: 'demo' }} onSubmit={() => {}}>
              <Flex vertical>
                <Input name="okA" label="字段 A" rule="LEN-0-50" />
                <Input name="okB" label="字段 B" rule="LEN-0-50" />
              </Flex>
            </Form>
          </Card>

          <Card title="2. 单行报错" size="small">
            <Form data={{}} onSubmit={() => {}} onError={() => {}}>
              <AutoSubmit />
              <Flex vertical>
                <Input name="shortA" label="字段 A" rule="REQ" />
                <Input name="shortB" label="字段 B" rule="REQ" />
                <Input name="shortC" label="字段 C" rule="REQ" />
                <SubmitButton type="primary">提交触发单行错误</SubmitButton>
              </Flex>
            </Form>
          </Card>

          <Divider style={{ margin: 0 }} />

          <Card title="3. 多行报错（窄容器换行）" size="small">
            <Form
              data={{ longA: 'demo', longB: 'demo', longC: 'demo' }}
              rules={{
                DEMO_LONG: () => ({ result: false, errMsg: LONG_ERR })
              }}
              onSubmit={() => {}}
              onError={() => {}}
            >
              <AutoSubmit />
              <Flex vertical>
                <Input name="longA" label="字段 A" rule="DEMO_LONG" />
                <Input name="longB" label="字段 B" rule="DEMO_LONG" />
                <Input name="longC" label="字段 C" rule="DEMO_LONG" />
                <SubmitButton type="primary">提交触发多行错误</SubmitButton>
              </Flex>
            </Form>
          </Card>
        </Flex>
      </div>
    </InfoPage>
  );
});

render(<BaseExample />);
