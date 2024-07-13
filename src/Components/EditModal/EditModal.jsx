import React from 'react';
import ReactDOM from 'react-dom';

export default function EditModal({onSubmit, onClose, children}) {
    //JSX
    return ReactDOM.createPortal(
        <div
            className="fixed top-0 z-20 flex items-center justify-center size-full bg-black-05 opacity-0 invisible transition modal-active">
            <div>
                <form className="w-[400px] bg-[var(--white)] text-center p-[30px] rounded-xl">
                    <h2 className="text-[1.4rem]">اطلاعات جدید را وارد نمایید</h2>

                    {children}

                    <div
                        className="flex justify-end gap-3 mt-5 [&>*]:px-[8px] [&>*]:py-[5px] [&>*]:text-[var(--white)] [&>*]:text-[1.1rem] [&>*]:rounded-[10px]">
                        <button className="bg-[var(--blue)]" onClick={(e) => onSubmit(e)}>ارسال</button>
                        <button className="bg-red-500" onClick={(e) => onClose(e)}>بستن</button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("modals-wrapper")
    );
}