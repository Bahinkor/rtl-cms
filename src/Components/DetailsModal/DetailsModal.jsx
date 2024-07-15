import React from 'react';
import ReactDOM from 'react-dom';

export default function DetailsModal({onClose, children}) {
    //JSX
    return ReactDOM.createPortal(
        <div
            className="fixed top-0 z-20 flex items-center justify-center size-full bg-black-05 opacity-0 invisible transition modal-active">
            <div className="flex flex-col bg-[var(--white)] text-[1.3rem] p-[30px] rounded-xl">

                {children}

                {/* close btn */}
                <button
                    className="self-end bg-[var(--blue)] text-[var(--white)] px-[8px] py-[5px] rounded-[10px]"
                    onClick={onClose}>
                    بستن
                </button>

            </div>
        </div>,
        document.getElementById("modals-wrapper")
    );
}