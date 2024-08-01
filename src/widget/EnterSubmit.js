import React, { useCallback } from 'react';
import { useFormContext } from '@kne/react-form';

const EnterSubmit = ({ type = 'div', children, ...props }) => {
  const { emitter } = useFormContext();
  const handlerKeyUp = useCallback(e => {
    if (e.keyCode === 13) {
      emitter.emit('form:submit');
    }
  }, [emitter]);

  return React.createElement(type, Object.assign({}, props, {
    onKeyUp: handlerKeyUp
  }), children);
};

export default EnterSubmit;
