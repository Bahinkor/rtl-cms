import React from 'react';

export default function CommentsTable() {
    //JSX
    return (
        <>

            <table className="w-full bg-[var(--white)] mt-[30px] rounded-[10px]">
                {/* table header */}
                <thead>
                <tr className="flex justify-between items-center text-center px-[70px] [&>*]:w-[100px] [&>*]:p-5">
                    <th>اسم کاربر</th>
                    <th>محصول</th>
                    <th>کامنت</th>
                    <th>تاریخ</th>
                    <th>ساعت</th>
                    <th className="!w-[200px]">اکشن</th>
                </tr>
                </thead>

                {/* products list */}
                <tbody>

                <tr
                    className="flex justify-between items-center text-center px-[70px] [&>*]:w-[100px] [&>*]:p-5">
                    <td>رضا</td>
                    <td>آیفون 13</td>
                    <td className="[&>button]:bg-[var(--blue)] [&>button]:text-[var(--white)] [&>button]:px-[8px] [&>button]:py-[5px] [&>button]:rounded-[10px]">
                        <button>نمایش</button>
                    </td>
                    <td>2024/06/12</td>
                    <td>13:46</td>
                    <td className="!w-[200px] [&>button]:text-[var(--white)] [&>button]:px-[8px] [&>button]:py-[5px] [&>button]:ml-1 [&>button]:rounded-[10px]">
                        <button className="bg-red-500">حذف</button>
                        <button className="bg-[var(--blue)]">پاسخ</button>
                        <button className="bg-green-600">تایید</button>
                    </td>
                </tr>

                </tbody>
            </table>

        </>
    );
}
