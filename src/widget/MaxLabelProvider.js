import React, {useState, useContext, createContext, useEffect, useMemo, useRef} from 'react';
import textWidth from "@kne/text-width";
import {useFieldInfo} from "@kne/react-form";
import uniq from 'lodash/uniq';

const context = createContext({});

const {Provider} = context;

export const useMaxLabelWidth = () => {
    const {maxWidth} = useContext(context);
    return maxWidth;
};

const MaxLabelProvider = ({minLabelWidth, children}) => {
    const [maxWidth, setMaxWidth] = useState(minLabelWidth || 0);
    const fields = useFieldInfo();
    const root = useRef(null);
    useEffect(() => {
        const label = (root.current.querySelector('.react-form__field-label')||root.current);
        const fontSize = window
            .getComputedStyle(label)
            .getPropertyValue('font-size');
        setMaxWidth(Math.max(...uniq(Object.values(fields).map(({label}) => label)).map((str)=>textWidth(str,fontSize))));
    }, [fields]);
    return <Provider value={{maxWidth, setMaxWidth}}>
        <span ref={root}>
            {children}
        </span>
    </Provider>
};

export default MaxLabelProvider;