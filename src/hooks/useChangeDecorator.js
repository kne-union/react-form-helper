import {useRef, useEffect, useCallback} from 'react';

const useChangeDecorator = ({triggerValidate, value, onChange, ...others}) => {
    const hasChanged = useRef(false), validate = useRef(void (0));
    const handlerChange = useCallback((...args) => {
        onChange && onChange(...args);
        hasChanged.current = true;
    }, [onChange]);

    useEffect(() => {
        validate.current = triggerValidate;
    }, [triggerValidate]);

    useEffect(() => {
        hasChanged.current && validate.current();
    }, [value]);

    return {
        value,
        onChange: handlerChange,
        ...others
    };
}

export default useChangeDecorator;
