import useBlurDecorator from './hooks/useBlurDecorator';
import useChangeDecorator from './hooks/useChangeDecorator';
import useCheckedToValue, { withChecked } from './hooks/useCheckedToValue';
import useDecorator, { useOnBlur, useOnChange } from './hooks/useDecorator';
import useUIDecorator from './hooks/useUIDecorator';
import useCacheRemove from './hooks/useCacheRemove';
import useFieldProps from './hooks/useFieldProps';
import ScrollToError from './widget/ScrollToError';
import EnterSubmit from './widget/EnterSubmit';
import MaxLabelProvider from './widget/MaxLabelProvider';
import SizeProvider from './widget/SizeProvider';
import FormStore from './widget/FormStore';
import { useField } from '@kne/react-form';

export const hooks = {
  useField,
  useFieldProps,
  useBlurDecorator,
  useChangeDecorator,
  useCheckedToValue,
  useDecorator,
  useOnBlur,
  useOnChange,
  useUIDecorator,
  useCacheRemove
};

export const hoc = {
  withChecked
};

export const widget = {
  ScrollToError,
  EnterSubmit,
  MaxLabelProvider,
  FormStore,
  SizeProvider
};

export const utils = {};

const api = {
  hooks,
  hoc,
  widget,
  utils
};

export { default as preset } from './preset';

export default api;
