import React from 'react';
import ReactDOM from 'react-dom';

export default function DeleteModal({cancelAction, submitAction, title}) {
    //JSX
    return ReactDOM.createPortal(
        // bg-black-05 is custom class
        <div
            className="fixed top-0 z-20 flex items-center justify-center size-full bg-black-05 opacity-0 invisible transition modal-active">
            {/* delete modal */}
            <div className="bg-[var(--white)] dark:bg-slate-700 text-center p-[50px] rounded-xl [&>*]:text-slate-200">
                <h2 className="text-[2rem]">{title}</h2>
                <div
                    className="flex gap-5 [&>button]:w-full [&>button]:text-[1.3rem] [&>button]:text-[var(--white)] [&>button]:py-[18px] [&>button]:mt-[30px] [&>button]:rounded-[10px]">
                    <button className="bg-[var(--blue)]" onClick={cancelAction}>خیر</button>
                    <button className="bg-red-500" onClick={submitAction}>بله</button>
                </div>
            </div>
        </div>,
        document.getElementById("modals-wrapper")
    );
}