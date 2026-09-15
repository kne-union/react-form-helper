import React, { useState, useContext, createContext, useLayoutEffect, useRef } from 'react';
import textWidth from '@kne/text-width';
import { useFormContext } from '@kne/react-form';
import { uniq } from 'lodash';

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
  useLayoutEffect(() => {
    if (!root.current) {
      return;
    }
    // label 在上、控件在下（react-form--inner）不需要对齐 label 列宽；
    // 按全文测 minWidth 会把 Field 撑出容器（长问卷题等场景）
    const form = root.current.closest('form');
    if (form?.classList.contains('react-form--inner')) {
      setMaxWidth(0);
      return;
    }
    const label = root.current.querySelector('.react-form__field-label') || root.current;
    const fontSize = window.getComputedStyle(label).getPropertyValue('font-size');
    const labels = [].map.call(root.current.querySelectorAll('.react-form__field-label'), item => item.innerText);
    if (!labels.length) {
      setMaxWidth(minLabelWidth || 0);
      return;
    }
    setMaxWidth(Math.max(...uniq(labels).map(str => textWidth(str, fontSize)), minLabelWidth || 0));
  }, [fields, minLabelWidth]);
  return (
    <Provider value={{ maxWidth, setMaxWidth }}>
      <span ref={root}>{children}</span>
    </Provider>
  );
};

export default MaxLabelProvider;
