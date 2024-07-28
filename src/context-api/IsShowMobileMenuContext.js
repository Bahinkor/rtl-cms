import {createContext, useState} from 'react';

const isShowMobileMenu = createContext();

const IsShowMobileMenuContext = ({children}) => {
    //state
    const [isOpen, setIsOpen] = useState(false);

    //JSX
    return (
        <isShowMobileMenu.Provider value={{isOpen, setIsOpen}}>
            {children}
        </isShowMobileMenu.Provider>
    );
}

export {IsShowMobileMenuContext, isShowMobileMenu};