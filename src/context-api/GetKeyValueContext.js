import {createContext, useState} from "react";

const KeyContext = createContext();

const GetKeyValueContext = ({children}) => {
    const [keyValueState, setKeyValueState] = useState(localStorage.getItem("key"));

    return (
        <KeyContext.Provider value={[keyValueState, setKeyValueState]}>
            {children}
        </KeyContext.Provider>
    );
}

export {KeyContext, GetKeyValueContext};