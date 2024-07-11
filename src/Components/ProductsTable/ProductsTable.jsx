import React from 'react';

export default function ProductsTable() {
    //JSX
    return (
        <table className="products-table">
            {/* table header */}
            <thead>
            <tr>
                <th>عکس</th>
                <th>اسم</th>
                <th>قیمت</th>
                <th>موجودی</th>
            </tr>
            </thead>

            {/* products list */}
            <tbody>

            <tr>
                <td>
                    <img src="/images/admin-profile01.jpg" alt="product image"/>
                </td>
                <td>روغن سزخ کردنی</td>
                <td>۹۲,۰۰۰ تومان</td>
                <td>۸۲</td>
                <td>
                    <button>جزئیات</button>
                    <button>حذف</button>
                    <button>ویرایش</button>
                </td>
            </tr>

            </tbody>
        </table>
    );
}