### hooks

通过 `import { hooks } from '@kne/react-form-helper'` 使用。

#### useDecorator

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

#### useOnBlur / useOnChange

与 `useDecorator` 相同的 UI 外壳，但校验时机固定：

| API | 校验时机 |
|-----|----------|
| `useOnBlur` | 失焦时 `triggerValidate` |
| `useOnChange` | 值变化后 `triggerValidate` |

#### useBlurDecorator / useChangeDecorator

底层装饰器，一般不必直接使用；分别把 `onBlur` / `onChange` 接到 `triggerValidate`。

#### useUIDecorator

把 `useField` 产出的字段状态渲染成 `.react-form__field` 结构（label、description、`.react-form__field-error`）。被上述 decorator 内部调用。

#### useFieldProps

在字段控件树内读取当前字段完整 props（由 `FieldPropsProvider` 注入），便于子组件感知 `name` / `errState` 等。

#### useCacheRemove

须在 `Form` 内使用。返回函数，调用后发出 `form-widget:store:remove`，配合 `FormStore` 清除本地草稿。

#### useField

从 `@kne/react-form` 再导出，便于与 helper 同包引用。

---

### hoc

#### withChecked

| 说明 | |
|------|--|
| 作用 | 把表单 `value` 映射为 UI 的 `checked` |
| 用法 | `const CheckboxUI = withChecked(Checkbox);` 再交给 `useDecorator` |

`useCheckedToValue` 为反向映射（`checked` → `value`），多用于自定义受控逻辑。

---

### widget

#### ScrollToError

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| scrollProps | `object` | `{}` | 传给首个错误字段 `fieldRef.scrollIntoView` |

监听 `form:submit:error`，滚动到第一个错误字段。

#### EnterSubmit

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| type | `string` | `'div'` | 包裹元素类型 |
| children | `ReactNode` | - | 表单内容 |

在容器内按下 Enter（keyCode 13）时触发 `form:submit`。

#### FormStore

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| cache | `string` | - | 本地缓存 key 后缀（必填） |

字段变更写入 localStorage；`form:submit:success` 或 `useCacheRemove` 时清除。

#### MaxLabelProvider

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| minLabelWidth | `number` | `0` | label 最小宽度 |
| children | `ReactNode` | - | 表单字段区域 |

按当前字段 label 文本计算最大宽度并对齐。表单带 `react-form--inner` 时自动跳过（label 在上、控件在下）。

#### SizeProvider

即 React Context Provider，`value={{ size }}`，`size` 为 `'small' \| 'middle' \| 'large'`。子字段经 `useUIDecorator` 注入到底层控件的 `size`。

---

### preset

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
