import {createContext, useState, useEffect} from "react";

const KeyContext = createContext();

const GetKeyValueContext = ({children}) => {
    // State
    const [keyValueState, setKeyValueState] = useState(localStorage.getItem("key"));

    // useEffect
    useEffect(() => {
        setKeyValueState(localStorage.getItem("key"));
    }, [localStorage.getItem("key")]);

    return (
        <KeyContext.Provider value={[keyValueState, setKeyValueState]}>
            {children}
        </KeyContext.Provider>
    );
}

export {KeyContext, GetKeyValueContext};