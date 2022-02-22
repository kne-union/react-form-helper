import useBlurDecorator from './hooks/useBlurDecorator';
import useChangeDecorator from './hooks/useChangeDecorator';
import useCheckedToValue, { withChecked } from './hooks/useCheckedToValue';
import useDecorator, { useOnBlur, useOnChange } from './hooks/useDecorator';
import useUIDecorator from './hooks/useUIDecorator';
import ScrollToError from './widget/ScrollToError';
import EnterSubmit from './widget/EnterSubmit';
import MaxLabelProvider from './widget/MaxLabelProvider';
import SizeProvider from './widget/SizeProvider';
import FormStore from './widget/FormStore';

export const hooks = {
  useBlurDecorator,
  useChangeDecorator,
  useCheckedToValue,
  useDecorator,
  useOnBlur,
  useOnChange,
  useUIDecorator
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

export default api;
