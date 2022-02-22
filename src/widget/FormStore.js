import { useEffect, useRef } from 'react';
import { useFormContext } from '@kne/react-form';

const FormStore = ({ cache }) => {
  const name = useRef(`REACT_FORM_STORE_${cache}`);
  const { emitter } = useFormContext();
  useEffect(() => {
    try {
      const data = window.localStorage.getItem(name.current);
      if (data) {
        const parseData = JSON.parse(data);
        setTimeout(() => {
          emitter.emit('form-data-set', { data: parseData });
        }, 0);
      }
    } catch (e) {}

    const subscriptionChange = emitter.addListener('form-data-change', ({ data }) => {
      const preData = window.localStorage.getItem(name.current),
        parseData = JSON.stringify(data);
      preData !== parseData && window.localStorage.setItem(name.current, parseData);
    });

    const subscriptionSubmit = emitter.addListener('form-submit-success', () => {
      window.localStorage.removeItem(name.current);
    });

    const subscriptionRemove = emitter.addListener('form-store-remove', ()=>{
        window.localStorage.removeItem(name.current);
    });

    return () => {
      subscriptionChange && subscriptionChange.remove();
      subscriptionSubmit && subscriptionSubmit.remove();
      subscriptionRemove && subscriptionRemove.remove();
    };
  }, [emitter]);
  return null;
};

export default FormStore;
