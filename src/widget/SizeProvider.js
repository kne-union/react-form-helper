import {createContext, useContext} from 'react';

const context = createContext({size: 'middle'});

const {Provider, Consumer} = context;

export const useFormSize = () => {
    const {size} = useContext(context);
    return size;
};

export default Provider;