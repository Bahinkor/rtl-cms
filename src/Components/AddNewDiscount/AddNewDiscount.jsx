import React, {useState, useContext} from 'react';
import {errorNotification, successNotification} from "../../react-toastify/react-toastify";
import {KeyContext} from "../../context-api/GetKeyValueContext";

export default function AddNewDiscount({getAllDiscounts}) {
    //state
    const [discountTitle, setDiscountTitle] = useState('');
    const [discountPercent, setDiscountPercent] = useState('');
    const [discountKey, setDiscountKey] = useState('');

    //context
    const keyValue = useContext(KeyContext)[0];

    //function
    const clearInputs = () => {
        setDiscountTitle('');
        setDiscountPercent('');
        setDiscountKey('');
    }

    const submitNewDiscount = async () => {
        const newDiscountInfos = new FormData();
        newDiscountInfos.append("title", discountTitle);
        newDiscountInfos.append("percent", discountPercent);
        newDiscountInfos.append("key", discountKey);
        newDiscountInfos.append("is_active", true);

        await fetch("http://localhost:8000/discounts/add/", {
            method: "POST",
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            },
            body: newDiscountInfos,
        })
            .then(res => {
                if (res.ok) {
                    successNotification();
                    clearInputs();
                    getAllDiscounts();
                } else {
                    errorNotification();
                    clearInputs();
                    console.log(res)
                }
            })
            .catch(err => {
                errorNotification();
                clearInputs();
                console.log(err)
            })
    }

    //JSX
    return (
        <div className="mt-[60px]">
            <h2 className="text-[2rem] dark:text-slate-200">افزودن تخفیف جدید</h2>

            <form className="flex flex-col items-end bg-[var(--white)] dark:bg-slate-800 p-5 mt-[30px] rounded-[20px]"
                  onSubmit={e => e.preventDefault()}>
                <div
                    className="grid grid-cols-2 gap-y-[10px] gap-x-[15px] w-full [&>div]:flex [&>div]:items-center [&>div]:gap-y-[10px] [&>div]:w-full [&>div]:bg-[#f4f4f4] [&>div]:dark:bg-slate-600 [&>div]:dark:text-slate-200 [&>div]:rounded-[10px]">
                    {/* form inputs */}

                    <div>
                        <input type="text" placeholder="اسم تخفیف را بنویسید"
                               className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                               value={discountTitle}
                               onChange={e => setDiscountTitle(e.target.value)}/>
                    </div>
                    {/*  */}
                    <div>
                        <input type="number" inputMode="numeric" placeholder="درصد تخفیف را بنویسید"
                               className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                               value={discountPercent}
                               onChange={e => setDiscountPercent(e.target.value)}/>
                    </div>
                    {/*  */}
                    <div>
                        <input type="text" placeholder="کد تخفیف را بنویسید"
                               className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                               value={discountKey}
                               onChange={e => setDiscountKey(e.target.value)}/>
                    </div>

                </div>
                <button
                    className="text-[1.1rem] text-[var(--white)] dark:text-slate-200 bg-[var(--blue)] py-[10px] px-5 mt-[10px] rounded-[10px]"
                    onClick={submitNewDiscount}>
                    ثبت تخفیف
                </button>
            </form>

        </div>
    );
}