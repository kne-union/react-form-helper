import React from 'react';

const useCheckedToValue = ({checked, ...props}) => {
    return {
        ...props,
        value: checked
    };
};

export default useCheckedToValue;

export const withChecked = (WrappedComponent) => {
    return ({value, ...props}) => <WrappedComponent {...props} checked={value}/>
};