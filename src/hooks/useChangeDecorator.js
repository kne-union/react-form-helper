import { useRef, useEffect, useCallback } from 'react';

const useChangeDecorator = ({ triggerValidate, value, onChange, ...others }) => {
  const hasChanged = useRef(false),
    validate = useRef(triggerValidate);
  const handlerChange = useCallback(
    (...args) => {
      onChange && onChange(...args);
      hasChanged.current = true;
    },
    [onChange]
  );
  validate.current = triggerValidate;
  useEffect(() => {
    hasChanged.current && validate.current && validate.current();
  }, [value]);

  return {
    value,
    onChange: handlerChange,
    ...others
  };
};

export default useChangeDecorator;
