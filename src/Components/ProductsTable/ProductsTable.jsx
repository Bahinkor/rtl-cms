import React from 'react';

export default function ProductsTable() {
    //JSX
    return (
        <table className="w-full bg-[var(--white)] mt-[30px] rounded-[10px]">
            {/* table header */}
            <thead>
            <tr className="flex justify-between text-center pr-[70px] pl-[460px]">
                <th>عکس</th>
                <th>اسم</th>
                <th>قیمت</th>
                <th>موجودی</th>
            </tr>
            </thead>

            {/* products list */}
            <tbody>

            <tr className="flex justify-between text-center pr-[10px] pl-[30px] [&>td]:flex [&>td]:items-center [&>td]:p-5">
                <td>
                    <img src="/images/admin-profile01.jpg" alt="product image"
                         className="w-[150px] rounded-[10px] object-cover"/>
                </td>
                <td>روغن سرخ کردنی</td>
                <td>۹۲,۰۰۰ تومان</td>
                <td>۸۲</td>
                <td className="[&>button]:text-[var(--white)] [&>button]:text-[1.1rem] [&>button]:bg-[var(--blue)] [&>button]:py-2 [&>button]:px-5 [&>button]:mr-5 [&>button]:rounded-[10px]">
                    <button>جزئیات</button>
                    <button>حذف</button>
                    <button>ویرایش</button>
                </td>
            </tr>

            </tbody>
        </table>
    );
}