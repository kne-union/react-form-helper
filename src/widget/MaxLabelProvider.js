import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import textWidth from '@kne/text-width';
import { useFormContext } from '@kne/react-form';
import uniq from 'lodash/uniq';

const context = createContext({});

const { Provider } = context;

export const useMaxLabelWidth = () => {
  const { maxWidth } = useContext(context);
  return maxWidth;
};

const MaxLabelProvider = ({ minLabelWidth, children }) => {
  const [maxWidth, setMaxWidth] = useState(minLabelWidth || 0);
  const { fields } = useFormContext();
  const root = useRef(null);
  useEffect(() => {
    const label = root.current.querySelector('.react-form__field-label') || root.current;
    const fontSize = window.getComputedStyle(label).getPropertyValue('font-size');
    setMaxWidth(
      Math.max(
        ...uniq(
          [].map.call(root.current.querySelectorAll('.react-form__field-label'), item => {
            return item.innerText;
          })
        ).map(str => textWidth(str, fontSize))
      )
    );
  }, [fields]);
  return (
    <Provider value={{ maxWidth, setMaxWidth }}>
      <span ref={root}>{children}</span>
    </Provider>
  );
};

export default MaxLabelProvider;
