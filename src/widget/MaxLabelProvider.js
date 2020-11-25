import React, {useState, useContext, createContext, useEffect} from 'react';
import textWidth from "@kne/text-width";
import {useEmitter} from "@kne/react-form";

const context = createContext({});

const {Provider} = context;


const useComputedMaxLabel = (setMaxWidth) => {
    const emitter = useEmitter();

    useEffect(() => {
        const subscription = emitter.addListener('form-field-add', ({label, fieldRef}) => {
            const fontSize = window
                .getComputedStyle(fieldRef.current.querySelector('.react-form__field-label'))
                .getPropertyValue('font-size');
            setMaxWidth && setMaxWidth((oldWidth) => Math.max(textWidth(label, fontSize), oldWidth));
        });
        return () => {
            subscription && subscription.remove();
        };
    }, [emitter, setMaxWidth]);
};

export const useMaxLabelWidth = () => {
    const {maxWidth} = useContext(context);
    return maxWidth;
};

const MaxLabelProvider = ({minLabelWidth, children}) => {
    const [maxWidth, setMaxWidth] = useState(minLabelWidth || 0);
    const [isMount, setIsMount] = useState(false);
    useEffect(() => {
        setIsMount(true);
        return () => {
            setIsMount(false);
        };
    }, [setIsMount]);
    useComputedMaxLabel(setMaxWidth);
    return <Provider value={{maxWidth, setMaxWidth}}>
        {isMount ? children : null}
    </Provider>
};

export default MaxLabelProvider;