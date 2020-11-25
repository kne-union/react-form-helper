import React, {useState, useCallback, useEffect} from 'react';
import classnames from 'classnames';
import {useMaxLabelWidth} from '../widget/MaxLabelProvider';
import {useEmitter} from "@kne/react-form";

const computedErrorClassName = ({errMsg, errState, isSubmit, isValueChanged}) => {
    return {
        'is-req-error': errMsg === '' && errState === 2 && (isSubmit || isValueChanged),
        'is-error': errMsg !== '' && errState === 2,
        'is-loading': errState === 3
    };
};

const useUIDecorator = (props) => {
    const {
        name, rule, className, onChange, label,
        labelHidden, errMsg, errState, isValueChanged, wrappedClassName, fieldRef,
        important, ignoreLabelWidth, formState, groupName, formData, ...others
    } = props;
    const [isREQ, setIsREQ] = useState(false),
        [isSubmit, setIsSubmit] = useState(false);
    const emitter = useEmitter();
    const labelWidth = useMaxLabelWidth();
    useEffect(() => {
        setIsREQ(
            (rule || '').split(' ')
                .indexOf('REQ') > -1
        );
    }, [setIsREQ, name, rule]);

    //当表单提交时设置状态
    useEffect(() => {
        const subscription = emitter.addListener('form-submit', () => {
            setIsSubmit(true);
        });
        return () => {
            subscription && subscription.remove();
        };
    }, [emitter, name]);

    const handlerChange = useCallback((...args) => {
        onChange(...args);
        setIsSubmit(false);
    }, [onChange, setIsSubmit]);

    return useCallback((WrappedComponent) => {
        const style = {};

        if (!ignoreLabelWidth && labelWidth > 0) {
            style.minWidth = labelWidth;
        }

        const stateClassName = computedErrorClassName({errMsg, errState, isSubmit, isValueChanged});
        const isReq = important !== void (0) ? important : isREQ;
        return (
            <div ref={fieldRef} className={classnames('react-form__field', wrappedClassName, stateClassName)}>
                <div className="react-form__field-main">
                    {label && !labelHidden ? (
                        <div
                            className={classnames('react-form__field-label', {'is-req': isReq})}
                            style={style}>
                            <i className="react-form__field_extra"/>
                            {label}
                        </div>
                    ) : null}
                    <div className="react-form__field-input">
                        <WrappedComponent {...others}
                                          className={classnames('react-form__field-component', className)}
                                          onChange={handlerChange}/>
                        {errMsg ? (
                            <div className="react-form__field-error">{errMsg}</div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }, [labelWidth, fieldRef, labelHidden, ignoreLabelWidth, others, isValueChanged, className, errMsg, errState, handlerChange, important, isREQ, isSubmit, label, wrappedClassName]);
};

export default useUIDecorator;