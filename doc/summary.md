### 概述

`@kne/react-form-helper` 桥接任意 UI 输入组件与 `@kne/react-form`：用 decorator hooks 完成字段注册与校验触发，用 `useUIDecorator` 渲染 label / 错误态，并用一组 widget 补齐滚动到错误、回车提交、草稿缓存、label 对齐、尺寸下发等能力。

### 主要特性

- **装饰器**：`useDecorator` / `useOnBlur` / `useOnChange` 一键把 UI 控件接到表单字段
- **布尔控件**：`withChecked` 适配 Checkbox、Switch 等 `checked` 语义
- **字段 UI**：统一的 label、必填标记、tips、description、错误文案布局（含多行错误占位）
- **Widget**：`ScrollToError`、`EnterSubmit`、`FormStore`、`MaxLabelProvider`、`SizeProvider`
- **preset**：可按字段名合并默认 props

### 使用场景

- 自建表单组件库（不必依赖 `@kne/react-form-antd`）
- 在业务里用 antd / 其它 UI 库快速包一层 Form 字段
- 需要草稿缓存、回车提交、校验失败自动滚动等表单交互增强
