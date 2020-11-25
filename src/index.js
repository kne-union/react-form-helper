import useBlurDecorator from './hooks/useBlurDecorator';
import useChangeDecorator from './hooks/useChangeDecorator';
import useCheckedToValue from './hooks/useCheckedToValue';
import useDecorator from './hooks/useDecorator';
import useUIDecorator from './hooks/useUIDecorator';
import ScrollToError from './widget/ScrollToError';
import EnterSubmit from './widget/EnterSubmit';
import MaxLabelProvider from './widget/MaxLabelProvider';
import FormStore from './widget/FormStore';
import isElementInViewport from './utils/isElementInViewport';


export const hooks = {
    useBlurDecorator,
    useChangeDecorator,
    useCheckedToValue,
    useDecorator,
    useUIDecorator
};

export const widget = {
    ScrollToError,
    EnterSubmit,
    MaxLabelProvider,
    FormStore
};

export const utils = {isElementInViewport};

const api = {
    hooks, widget, utils
};

export default api;

