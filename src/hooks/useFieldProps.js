import React, { createContext, useContext } from 'react';

const context = createContext({});

const useFieldProps = () => {
  return useContext(context);
};

const { Provider } = context;

export const FieldPropsProvider = ({ props, children }) => {
  return <Provider value={props}>{children}</Provider>;
};

export default useFieldProps;
