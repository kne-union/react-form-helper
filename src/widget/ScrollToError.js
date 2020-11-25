import {useEffect} from 'react';
import {useEmitter} from "@kne/react-form";
import isElementInViewport from '../utils/isElementInViewport';

const ScrollToError = () => {
    const emitter = useEmitter();
    useEffect(() => {
        const subscription = emitter.addListener('form-submit-error', (errors) => {
            const el = errors[0].fieldRef.current;
            !isElementInViewport(el) && el.scrollIntoView();
        });
        return () => {
            subscription && subscription.remove();
        }
    }, [emitter]);

    return null;
};

export default ScrollToError;