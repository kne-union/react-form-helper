import {useCallback} from 'react';

const useBlurDecorator = ({triggerValidate, onBlur, ...others}) => {
    const handlerBlur = useCallback((...args) => {
        onBlur && onBlur(...args);
        triggerValidate();
    }, [onBlur, triggerValidate]);
    return {
        onBlur: handlerBlur,
        ...others
    };
};

export default useBlurDecorator;