import { useEffect, useRef } from 'react';
import { useFormContext } from '@kne/react-form';
import localStorage from '@kne/local-storage';


const FormStore = ({ cache }) => {
  const name = useRef(`REACT_FORM_STORE_${cache}`);
  const fieldsRef = useRef(new Map());
  const { emitter, openApi } = useFormContext();
  useEffect(() => {
    const data = localStorage.getItem(name.current) || {};

    const subscriptionFieldReady = emitter.addListener('form:field:ready', (field) => {
      if (data[field.path]) {
        emitter.emit(`form-field:input:${field.id}`, { value: data[field.path].value });
      }
    });

    const subscriptionChange = emitter.addListener('form:field:set-value', ({ id, value, path }) => {
      if (value === void 0) {
        return;
      }
      fieldsRef.current.set(id, { id, value, path });
      const preData = Object.assign({}, localStorage.getItem(name.current));
      preData[path] = { id, value, path };
      localStorage.setItem(name.current, preData);
    });

    const subscriptionSubmit = emitter.addListener('form:submit:success', () => {
      localStorage.removeItem(name.current);
    });

    const subscriptionRemove = emitter.addListener('form-widget:store:remove', () => {
      localStorage.removeItem(name.current);
    });

    return () => {
      subscriptionFieldReady && subscriptionFieldReady.remove();
      subscriptionChange && subscriptionChange.remove();
      subscriptionSubmit && subscriptionSubmit.remove();
      subscriptionRemove && subscriptionRemove.remove();
    };
  }, [emitter]);
  return null;
};

export default FormStore;
