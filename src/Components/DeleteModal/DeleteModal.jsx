import React from 'react';
import ReactDOM from 'react-dom';

export default function DeleteModal() {
    //JSX
    return ReactDOM.createPortal(
        // bg-black-05 is custom class
        <div
            className="fixed z-20 flex items-center justify-center size-full bg-black-05 opacity-0 invisible transition modal-active">
            {/* delete modal */}
            <div className="bg-[var(--white)] text-center p-[50px] rounded-xl">
                <h2 className="text-[2rem]">آیا از حذف اطمینان دارید؟</h2>
                <div
                    className="flex gap-5 [&>button]:w-full [&>button]:text-[1.3rem] [&>button]:text-[var(--white)] [&>button]:py-[18px] [&>button]:mt-[30px] [&>button]:rounded-[10px]">
                    <button className="bg-red-500">بله</button>
                    <button className="bg-[var(--blue)]">خیر</button>
                </div>
            </div>
        </div>,
        document.getElementById("modals-wrapper")
    );
}