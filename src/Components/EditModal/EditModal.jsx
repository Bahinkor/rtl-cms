import React from 'react';
import ReactDOM from 'react-dom';

export default function EditModal({submitAction, onClose, children}) {
    //JSX
    return ReactDOM.createPortal(
        <div
            className="fixed top-0 z-20 flex items-center justify-center size-full bg-black-05 opacity-0 invisible transition modal-active">
            <div>
                <form className="w-[800px] bg-[var(--white)] text-center p-[30px] rounded-xl"
                      onSubmit={e => e.preventDefault()}
                      onKeyPress={e => {
                          if (e.key === "Enter") {
                              e.preventDefault();
                          }
                      }}>
                    <h2 className="text-[1.4rem]">اطلاعات جدید را وارد نمایید</h2>

                    <div className="grid grid-cols-2 gap-5">
                        {children}
                    </div>

                    <div
                        className="flex justify-end gap-3 mt-5 [&>*]:px-[8px] [&>*]:py-[5px] [&>*]:text-[var(--white)] [&>*]:text-[1.1rem] [&>*]:rounded-[10px]">
                        <button className="bg-red-500" onClick={onClose} type="button">بستن</button>
                        <button className="bg-[var(--blue)]" onClick={submitAction}>ارسال</button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("modals-wrapper")
    );
}