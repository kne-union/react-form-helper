import {useEffect, useRef} from 'react';
import {useEmitter} from "@kne/react-form";

const FormStore = ({cache}) => {
    const name = useRef(`REACT_FORM_STORE_${cache}`);
    const emitter = useEmitter();
    useEffect(() => {
        try {
            const data = window.localStorage.getItem(name.current);
            if (data) {
                const parseData = JSON.parse(data);
                setTimeout(() => {
                    emitter.emit('form-data-set', {data: parseData});
                }, 0);
            }
        } catch (e) {
        }

        emitter.addListener('form-state-change', ({data}) => {
            window.localStorage.setItem(name.current, JSON.stringify(data));
        });
    }, [emitter]);
    return null;
};

export default FormStore;