import React from 'react';
import ReactDOM from 'react-dom';

export default function DetailsModal({onClose}) {
    //JSX
    return ReactDOM.createPortal(
        <div
            className="fixed top-0 z-20 flex items-center justify-center size-full bg-black-05 opacity-0 invisible transition modal-active">
            <div className="flex flex-col bg-[var(--white)] text-[1.3rem] p-[30px] rounded-xl">
                <table className="w-full bg-[var(--white)] mt-5 rounded-[10px]">

                    <thead>
                    <tr className="text-center [&>*]:p-5">
                        <th>اسم</th>
                        <th>قیمت</th>
                        <th>محبوبیت</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr className="text-center [&>*]:p-5">
                        <td>لپتاپ</td>
                        <td>۱۲,۰۰۰,۰۰۰ تومان</td>
                        <td>۹۱</td>
                    </tr>
                    </tbody>

                </table>
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