<!--START_SECTION:DOC_MD-->

# react-form-helper

### 描述

react-form的辅助工具包

### 关键词

react, form, validate

### 安装

```shell
npm i --save @kne/react-form-helper
```

### 概述

#### 概述

`@kne/react-form-helper` 桥接任意 UI 输入组件与 `@kne/react-form`：用 decorator hooks 完成字段注册与校验触发，用 `useUIDecorator` 渲染 label / 错误态，并用一组 widget 补齐滚动到错误、回车提交、草稿缓存、label 对齐、尺寸下发等能力。

#### 主要特性

- **装饰器**：`useDecorator` / `useOnBlur` / `useOnChange` 一键把 UI 控件接到表单字段
- **布尔控件**：`withChecked` 适配 Checkbox、Switch 等 `checked` 语义
- **字段 UI**：统一的 label、必填标记、tips、description、错误文案布局（含多行错误占位）
- **Widget**：`ScrollToError`、`EnterSubmit`、`FormStore`、`MaxLabelProvider`、`SizeProvider`
- **preset**：可按字段名合并默认 props

#### 使用场景

- 自建表单组件库（不必依赖 `@kne/react-form-antd`）
- 在业务里用 antd / 其它 UI 库快速包一层 Form 字段
- 需要草稿缓存、回车提交、校验失败自动滚动等表单交互增强


### 示例

#### 示例代码

- 基本示例
- 用 useDecorator 把 antd Input 接到 @kne/react-form
- _ReactFormHelper(@kne/current-lib_react-form-helper),(@kne/current-lib_react-form-helper/dist/index.css),antd(antd),_ReactForm(@kne/react-form),remoteLoader(@kne/remote-loader)

```jsx
const { createWithRemoteLoader } = remoteLoader;
const { hooks } = _ReactFormHelper;
const { default: Form, useSubmit } = _ReactForm;
const { Input: InputField, Button, Flex } = antd;

const { useDecorator } = hooks;

const Input = props => {
  const render = useDecorator(Object.assign({ placeholder: &#96;请输入${props.label}&#96; }, props));
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

```

- 校验时机
- 对照 useOnBlur / useOnChange / useDecorator(realtime) 的触发时机
- _ReactFormHelper(@kne/current-lib_react-form-helper),(@kne/current-lib_react-form-helper/dist/index.css),antd(antd),_ReactForm(@kne/react-form),remoteLoader(@kne/remote-loader)

```jsx
const { createWithRemoteLoader } = remoteLoader;
const { hooks } = _ReactFormHelper;
const { default: Form, useSubmit } = _ReactForm;
const { Input: InputField, Button, Flex, Alert } = antd;

const { useDecorator, useOnChange, useOnBlur } = hooks;

const BlurInput = props => {
  const render = useOnBlur(Object.assign({ placeholder: &#96;请输入${props.label}&#96; }, props));
  return render(InputField);
};

const ChangeInput = props => {
  const render = useOnChange(Object.assign({ placeholder: &#96;请输入${props.label}&#96; }, props));
  return render(InputField);
};

const RealtimeInput = props => {
  const render = useDecorator(Object.assign({ placeholder: &#96;请输入${props.label}&#96;, realtime: true }, props));
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

```

- Checkbox / Switch
- withChecked 把 value 映射为 checked，适配 antd 布尔控件
- _ReactFormHelper(@kne/current-lib_react-form-helper),(@kne/current-lib_react-form-helper/dist/index.css),antd(antd),_ReactForm(@kne/react-form),remoteLoader(@kne/remote-loader)

```jsx
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

```

- 字段 UI
- labelTips、description、MaxLabelProvider、SizeProvider、useFieldProps
- _ReactFormHelper(@kne/current-lib_react-form-helper),(@kne/current-lib_react-form-helper/dist/index.css),antd(antd),_ReactForm(@kne/react-form),remoteLoader(@kne/remote-loader)

```jsx
const { createWithRemoteLoader } = remoteLoader;
const { hooks, widget } = _ReactFormHelper;
const { default: Form, useSubmit } = _ReactForm;
const { Input: InputField, Button, Flex, Radio, Space, Alert } = antd;
const { useState } = React;

const { useDecorator, useFieldProps } = hooks;
const { MaxLabelProvider, SizeProvider } = widget;

const Input = props => {
  const render = useDecorator(Object.assign({ placeholder: &#96;请输入${props.label}&#96; }, props));
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
  const render = useDecorator(Object.assign({ placeholder: &#96;请输入${props.label}&#96; }, props));
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

```

- 表单 Widget
- ScrollToError、EnterSubmit、FormStore、useCacheRemove
- _ReactFormHelper(@kne/current-lib_react-form-helper),(@kne/current-lib_react-form-helper/dist/index.css),antd(antd),_ReactForm(@kne/react-form),remoteLoader(@kne/remote-loader)

```jsx
const { createWithRemoteLoader } = remoteLoader;
const { hooks, widget } = _ReactFormHelper;
const { default: Form, useSubmit } = _ReactForm;
const { Input: InputField, Button, Flex, Alert, Space } = antd;

const { useDecorator, useCacheRemove } = hooks;
const { EnterSubmit, FormStore, ScrollToError } = widget;

const Input = props => {
  const render = useDecorator(Object.assign({ placeholder: &#96;请输入${props.label}&#96; }, props));
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

```

- 多行错误间距
- 对照未报错 / 单行报错 / 多行报错：多行错误不得盖住下一 Field，单行与未报错净间距应接近
- _ReactFormHelper(@kne/current-lib_react-form-helper),(@kne/current-lib_react-form-helper/dist/index.css),antd(antd),_ReactForm(@kne/react-form),remoteLoader(@kne/remote-loader)

```jsx
const { createWithRemoteLoader } = remoteLoader;
const { hooks } = _ReactFormHelper;
const { default: Form, useSubmit, useFormContext } = _ReactForm;
const { Input: InputField, Button, Flex, Card, Alert, Divider } = antd;
const { useEffect, useRef } = React;

const { useDecorator } = hooks;

const Input = props => {
  const render = useDecorator(Object.assign({ placeholder: &#96;请输入${props.label}&#96; }, props));
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

```

### API

#### hooks

通过 `import { hooks } from '@kne/react-form-helper'` 使用。

##### useDecorator

默认装饰器：失焦校验；传入 `realtime` 时改为带 debounce 的变更校验，并渲染字段外壳（label / 错误）。

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| name | `string` | - | 字段名（必填，透传 `useField`） |
| rule | `string` | - | 校验规则串，如 `REQ EMAIL` |
| label | `string` | - | 字段标签 |
| realtime | `boolean` | `false` | 为 true 时按变更校验（默认 debounce 500ms） |
| description | `ReactNode` | - | 控件下方说明文案 |
| labelTips | `ReactNode \| function` | - | 标签旁提示 |
| labelRender | `function` | - | 自定义 label 渲染 |
| labelHidden | `boolean` | `false` | 隐藏 label |
| important | `boolean` | - | 强制显示/隐藏必填星号；默认根据规则是否含 `REQ` |
| ignoreLabelWidth | `boolean` | `false` | 跳过 `MaxLabelProvider` 的 minWidth |
| fieldName | `string` | - | 用于 `preset` 按字段类型合并默认 props |
| ... | - | - | 其余 props 透传给底层 UI 组件 |

返回值为 render 函数：`const render = useDecorator(props); return render(Input);`

##### useOnBlur / useOnChange

与 `useDecorator` 相同的 UI 外壳，但校验时机固定：

| API | 校验时机 |
|-----|----------|
| `useOnBlur` | 失焦时 `triggerValidate` |
| `useOnChange` | 值变化后 `triggerValidate` |

##### useBlurDecorator / useChangeDecorator

底层装饰器，一般不必直接使用；分别把 `onBlur` / `onChange` 接到 `triggerValidate`。

##### useUIDecorator

把 `useField` 产出的字段状态渲染成 `.react-form__field` 结构（label、description、`.react-form__field-error`）。被上述 decorator 内部调用。

##### useFieldProps

在字段控件树内读取当前字段完整 props（由 `FieldPropsProvider` 注入），便于子组件感知 `name` / `errState` 等。

##### useCacheRemove

须在 `Form` 内使用。返回函数，调用后发出 `form-widget:store:remove`，配合 `FormStore` 清除本地草稿。

##### useField

从 `@kne/react-form` 再导出，便于与 helper 同包引用。

---

#### hoc

##### withChecked

| 说明 | |
|------|--|
| 作用 | 把表单 `value` 映射为 UI 的 `checked` |
| 用法 | `const CheckboxUI = withChecked(Checkbox);` 再交给 `useDecorator` |

`useCheckedToValue` 为反向映射（`checked` → `value`），多用于自定义受控逻辑。

---

#### widget

##### ScrollToError

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| scrollProps | `object` | `{}` | 传给首个错误字段 `fieldRef.scrollIntoView` |

监听 `form:submit:error`，滚动到第一个错误字段。

##### EnterSubmit

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| type | `string` | `'div'` | 包裹元素类型 |
| children | `ReactNode` | - | 表单内容 |

在容器内按下 Enter（keyCode 13）时触发 `form:submit`。

##### FormStore

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| cache | `string` | - | 本地缓存 key 后缀（必填） |

字段变更写入 localStorage；`form:submit:success` 或 `useCacheRemove` 时清除。

##### MaxLabelProvider

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| minLabelWidth | `number` | `0` | label 最小宽度 |
| children | `ReactNode` | - | 表单字段区域 |

按当前字段 label 文本计算最大宽度并对齐。表单带 `react-form--inner` 时自动跳过（label 在上、控件在下）。

##### SizeProvider

即 React Context Provider，`value={{ size }}`，`size` 为 `'small' \| 'middle' \| 'large'`。子字段经 `useUIDecorator` 注入到底层控件的 `size`。

---

#### preset

```js
import preset from '@kne/react-form-helper';

preset({
  globalProps: { /* 所有字段默认 props */ },
  field: {
    Input: { /* fieldName === 'Input' 时的默认 props */ }
  }
});
```

在 `useDecorator` / `useOnBlur` / `useOnChange` 中通过 `fieldName` 与全局配置合并。

<!--END_SECTION:DOC_MD-->
