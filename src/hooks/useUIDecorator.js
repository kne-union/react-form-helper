import React, { useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { useMaxLabelWidth } from '../widget/MaxLabelProvider';
import { useFormContext } from '@kne/react-form';
import { useFormSize } from '../widget/SizeProvider';
import { FieldPropsProvider } from './useFieldProps';
import { globalParams } from '../preset';

const computedErrorClassName = ({ errMsg, errState, isSubmit, isValueChanged }) => {
  return {
    'is-req-error': errMsg === '' && errState === 2 && (isSubmit || isValueChanged),
    'is-error': errMsg !== '' && errState === 2,
    'is-loading': errState === 3
  };
};

const useUIDecorator = props => {
  const {
    id,
    name,
    rule,
    description,
    className,
    onChange,
    label,
    labelRender,
    labelHidden,
    errMsg,
    errState,
    isValueChanged,
    wrappedClassName,
    fieldRef,
    important,
    ignoreLabelWidth,
    formState,
    groupIndex,
    groupName,
    formData,
    render,
    ...others
  } = props;
  const size = useFormSize();
  const [isREQ, setIsREQ] = useState(false),
    [isSubmit, setIsSubmit] = useState(false);
  const { emitter } = useFormContext();
  const labelWidth = useMaxLabelWidth();
  useEffect(() => {
    typeof rule === 'string' && setIsREQ((rule || '').split(' ').indexOf('REQ') > -1);
  }, [setIsREQ, name, rule]);

  //当表单提交时设置状态
  useEffect(() => {
    const subscription = emitter.addListener('form-submit', () => {
      setIsSubmit(true);
    });
    return () => {
      subscription && subscription.remove();
    };
  }, [emitter]);

  const handlerChange = useCallback(
    (...args) => {
      onChange(...args);
      setIsSubmit(false);
    },
    [onChange, setIsSubmit]
  );

  const renderFunc = useCallback(
    WrappedComponent => {
      const style = {};

      if (!ignoreLabelWidth && labelWidth > 0) {
        style.minWidth = labelWidth;
      }

      const stateClassName = computedErrorClassName({ errMsg, errState, isSubmit, isValueChanged });
      const isReq = important !== void 0 ? important : isREQ;
      if (size) {
        others.size = size;
      }
      return (
        <div
          ref={fieldRef}
          className={classnames(
            'react-form__field',
            {
              'is-ignore-label-width': ignoreLabelWidth
            },
            wrappedClassName,
            stateClassName
          )}
        >
          <div className="react-form__field-main">
            {label && !labelHidden ? (
              <div className={classnames('react-form__field-label', { 'is-req': isReq })} style={style}>
                <i className="react-form__field_extra" />
                {typeof labelRender === 'function' ? labelRender({ label }) : label}
              </div>
            ) : null}
            <div className="react-form__field-input">
              <FieldPropsProvider props={props}>
                <WrappedComponent {...others} className={classnames('react-form__field-component', className)} onChange={handlerChange} />
                {description ? <div className="react-form__field-describable">{description}</div> : null}
                {errMsg ? <div className="react-form__field-error">{errMsg}</div> : null}
              </FieldPropsProvider>
            </div>
          </div>
        </div>
      );
    },
    [labelWidth, fieldRef, labelHidden, ignoreLabelWidth, others, isValueChanged, className, errMsg, errState, handlerChange, important, isREQ, isSubmit, label, wrappedClassName]
  );
  const renderProps = render || globalParams.render;
  return typeof renderProps === 'function' ? renderProps(renderFunc) : renderFunc;
};

export default useUIDecorator;
