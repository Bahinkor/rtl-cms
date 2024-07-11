import React, {useState} from 'react';

export default function AddNewProduct() {
    //state
    const [inputs, setInputs] = useState([
        {
            id: 1,
            placeholder: "اسم محصول را بنویسید"
        },
        {
            id: 2,
            placeholder: "قیمت محصول را بنویسید"
        },
        {
            id: 3,
            placeholder: "موجودی محصول را بنویسید"
        },
        {
            id: 4,
            placeholder: "آدرس عکس محصول را بنویسید"
        },
        {
            id: 5,
            placeholder: "میزان محبوبیت محصول را بنویسید"
        },
        {
            id: 6,
            placeholder: "میزان فروش محصول را بنویسید"
        },
        {
            id: 7,
            placeholder: "اسامی رنگ بندی محصول را بنویسید"
        },
    ]);


    //JSX
    return (
        <div className="mt-[60px]">
            <h2 className="text-[2rem]">افزودن محصول جدید</h2>

            <form action="#" className="flex flex-col items-end bg-[var(--white)] p-5 mt-[30px] rounded-[20px]">
                <div
                    className="grid grid-cols-2 gap-y-[10px] gap-x-[15px] w-full [&>div]:flex [&>div]:items-center [&>div]:gap-y-[10px] [&>div]:w-full [&>div]:bg-[#f4f4f4] [&>div]:px-5 [&>div]:rounded-[10px]">
                    {/* form inputs */}
                    {
                        inputs.map(input => (
                            <div key={input.id}>
                                <input type="text" placeholder={input.placeholder}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"/>
                            </div>
                        ))
                    }

                </div>
                <button
                    className="text-[1.1rem] text-[var(--white)] bg-[var(--blue)] py-[10px] px-5 mt-[10px] rounded-[10px]">ثبت
                    محصول
                </button>
            </form>
        </div>
    );
}