import React from 'react';
import ReactDOM from 'react-dom';

export default function ReplyModal({onClose, submitAction, children}) {
    //JSX
    return ReactDOM.createPortal(
        <div
            className="fixed top-0 z-20 flex items-center justify-center size-full bg-black-05 opacity-0 invisible transition modal-active">

            <div className="w-[800px] bg-[var(--white)] dark:bg-slate-700 text-center p-[30px] rounded-xl">
                <h2 className="text-[1.4rem] mb-3 dark:text-slate-200">ریپلای خود را ثبت کنید</h2>

                {children}

                {/* buttons */}
                <div
                    className="flex justify-end gap-3 mt-5 [&>*]:px-[8px] [&>*]:py-[5px] [&>*]:text-[var(--white)] [&>*]:text-[1.1rem] [&>*]:rounded-[10px]">
                    <button className="bg-red-500" onClick={onClose} type="button">بستن</button>
                    <button className="bg-[var(--blue)]" onClick={submitAction} type="submit">ارسال</button>
                </div>
            </div>

        </div>,
        document.getElementById("modals-wrapper")
    );

}