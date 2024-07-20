import React, {useState, useEffect} from 'react';
import Loading from '../Loading/Loading';
import ErrorBox from '../ErrorBox/ErrorBox';

export default function OrdersTable() {
    //state
    const [allOrders, setAllOrders] = useState(null);

    //function
    const getAllOrders = async () => {
        fetch("http://localhost:8000/orders/", {
            headers: {
                "Authorization": "Token 502387428aee0698042273c57145ed5aea88cadb",
            }
        })
            .then(res => res.json())
            .then(data => setAllOrders(data))
            .catch(err => console.log(err));
    }

    //usrEffect
    useEffect(() => {
        getAllOrders();
    }, [])

    //JSX
    return (
        <>
            {
                allOrders === null ? (
                    <Loading/>
                ) : allOrders.length ? (
                    < table
                        className="w-full bg-[var(--white)] dark:bg-slate-800 dark:text-slate-200 mt-[30px] rounded-[10px]">
                        {/* table header */}
                        <thead>
                        <tr className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">
                            <th>یوزرنیم</th>
                            <th>وضعیت</th>
                            <th>شماره سفارش</th>
                            <th>اکشن</th>
                        </tr>
                        </thead>

                        {/* Users list */}
                        <tbody>

                        {
                            allOrders.map(order => (
                                <tr key={order.order_code}
                                    className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">
                                    <td>{order.user.username}</td>
                                    <td>{order.is_active ? "فعال" : "غیرفعال"}</td>
                                    <td>{order.order_code}</td>
                                    <td className="[&>button]:btn !p-[5px]">
                                        <button className="green-btn">خالی</button>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>
                ) : (
                    <ErrorBox message="هیچ سفارشی یافت نشد."/>
                )
            }
        </>
    );
}