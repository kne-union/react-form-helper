import { useEffect } from 'react';
import { useFormContext } from '@kne/react-form';
import { get } from 'lodash';

const ScrollToError = ({ scrollProps = {} }) => {
  const { emitter } = useFormContext();
  useEffect(() => {
    const subscription = emitter.addListener('form:submit:error', errors => {
      const el = get(errors, '[0].fieldRef.current');
      el && typeof el.scrollIntoView === 'function' && el.scrollIntoView(scrollProps);
    });
    return () => {
      subscription && subscription.remove();
    };
  }, [emitter]);

  return null;
};

export default ScrollToError;
