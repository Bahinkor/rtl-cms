import React from 'react';

export default function UsersTable() {
    //JSX
    return (
        <>

            <table className="w-full bg-[var(--white)] mt-[30px] rounded-[10px]">
                {/* table header */}
                <thead>
                <tr className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">
                    <th>نام و نام خانوادگی</th>
                    <th>یوزرنیم</th>
                    <th>پسورد</th>
                    <th>شماره تماس</th>
                    <th>ایمیل</th>
                    <th>اکشن</th>
                </tr>
                </thead>

                {/* Users list */}
                <tbody>

                <tr
                    className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="[&>button]:btn !p-[5px]">
                        <button className="blue-btn">جزئیات</button>
                        <button className="red-btn">حذف</button>
                        <button className="green-btn">ویرایش</button>
                    </td>
                </tr>

                </tbody>
            </table>

        </>
    );
}