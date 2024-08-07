import { useFormContext } from '@kne/react-form';

const useCacheRemove = () => {
  const { emitter } = useFormContext();
  return () => {
    emitter.emit('form-widget:store:remove');
  };
};

export default useCacheRemove;
