import React, {useCallback} from "react";
import {useEmitter} from "@kne/react-form";

const EnterSubmit = ({type, children, ...props}) => {
    const emitter = useEmitter();
    const handlerKeyUp = useCallback((e) => {
        if (e.keyCode === 13) {
            emitter.emit('form-submit');
        }
    }, [emitter]);

    return React.createElement(type, Object.assign({}, props, {
        onKeyUp: handlerKeyUp
    }), children);
};

EnterSubmit.defaultProps = {
    type: 'div'
};

export default EnterSubmit;