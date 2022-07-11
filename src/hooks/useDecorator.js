import { useField } from '@kne/react-form';
import useUIDecorator from './useUIDecorator';
import useBlurDecorator from './useBlurDecorator';
import useChangeDecorator from './useChangeDecorator';
import { globalParams } from '../preset';

const defaultPropsAssign = ({ fieldName, ...props }) => {
  return Object.assign({}, globalParams.field[fieldName], props);
};

const useDecorator = ({ realtime, ...props }) => {
  const fieldProps = useField(defaultPropsAssign(Object.assign(realtime ? { debounce: 500 } : {}, props))),
    changeProps = useChangeDecorator(fieldProps),
    blurProps = useBlurDecorator(fieldProps),
    realtimeProps = Object.assign({}, blurProps, changeProps);
  return useUIDecorator(realtime ? realtimeProps : blurProps);
};

export default useDecorator;

export const useOnChange = props => {
  const fieldProps = useField(defaultPropsAssign(props)),
    changeProps = useChangeDecorator(fieldProps);
  return useUIDecorator(changeProps);
};

export const useOnBlur = props => {
  const fieldProps = useField(defaultPropsAssign(props)),
    blurProps = useBlurDecorator(fieldProps);
  return useUIDecorator(blurProps);
};
