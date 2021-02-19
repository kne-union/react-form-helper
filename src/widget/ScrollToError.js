import { useEffect } from 'react';
import { useEmitter } from '@kne/react-form';
import isElementInViewport from '../utils/isElementInViewport';

const ScrollToError = ({ scrollProps }) => {
  const emitter = useEmitter();
  useEffect(() => {
    const subscription = emitter.addListener('form-submit-error', errors => {
      const el = errors[0].fieldRef.current;
      !isElementInViewport(el) && el.scrollIntoView(scrollProps);
    });
    return () => {
      subscription && subscription.remove();
    };
  }, [emitter]);

  return null;
};

ScrollToError.defaultProps = {
  scrollProps: {}
};

export default ScrollToError;
