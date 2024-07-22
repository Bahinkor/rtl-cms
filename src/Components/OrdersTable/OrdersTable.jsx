import React, {useState, useEffect} from 'react';
import Loading from '../Loading/Loading';
import ErrorBox from '../ErrorBox/ErrorBox';
import DetailsModal from '../DetailsModal/DetailsModal';

export default function OrdersTable() {
    //state
    const [allOrders, setAllOrders] = useState(null);
    const [mainOrderItems, setMainOrderItems] = useState([]);
    const [mainOrderID, setMainOrderID] = useState(null);
    const [isSowDetailsModal, setIsSowDetailsModal] = useState(false);

    //function
    const getAllOrders = async () => {
        await fetch("http://localhost:8000/orders/", {
            headers: {
                "Authorization": "Token 502387428aee0698042273c57145ed5aea88cadb",
            }
        })
            .then(res => res.json())
            .then(data => setAllOrders(data))
            .catch(err => console.log(err));
    }

    const closeDetailsModal = () => {
        setIsSowDetailsModal(false);
    }

    const getMainOrderItems = async () => {
        await fetch(`http://localhost:8000/orders/detail/items/${mainOrderID}/`, {
            headers: {
                "Authorization": "Token 502387428aee0698042273c57145ed5aea88cadb",
            }
        })
            .then(res => res.json())
            .then(data => setMainOrderItems(data))
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
                                        <button className="blue-btn" onClick={() => {
                                            setMainOrderID(order.order_code);
                                            setIsSowDetailsModal(true);
                                            getMainOrderItems();
                                        }}>جزئیات
                                        </button>
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

            {/* Details Modal */}
            {
                isSowDetailsModal && (
                    <DetailsModal onClose={closeDetailsModal}>
                        <table className="w-full bg-[var(--white)] mt-5 rounded-[10px]">

                            <thead>
                            <tr className="text-center [&>*]:p-5">
                                <th>محصول</th>
                                <th>کد محصول</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                mainOrderItems.map(item => (
                                    <tr key={item.item_code} className="text-center [&>*]:p-5">
                                        <td>{item.product.title}</td>
                                        <td>{item.product.product_code}</td>
                                    </tr>
                                ))
                            }
                            </tbody>

                        </table>
                    </DetailsModal>
                )
            }
        </>
    );
}