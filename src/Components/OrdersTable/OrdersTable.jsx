import React, {useState, useEffect, useContext} from 'react';
import Loading from '../Loading/Loading';
import ErrorBox from '../ErrorBox/ErrorBox';
import DetailsModal from '../DetailsModal/DetailsModal';
import {KeyContext} from "../../context-api/GetKeyValueContext";
import DeleteModal from "../DeleteModal/DeleteModal";
import {errorNotification, successNotification} from "../../react-toastify/react-toastify";


export default function OrdersTable() {
    //state
    const [allOrders, setAllOrders] = useState(null);
    const [mainOrderItems, setMainOrderItems] = useState([]);
    const [mainOrderID, setMainOrderID] = useState(null);
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
    const [isShowRejectModal, setIsShowRejectModal] = useState(false);

    //context
    const keyValue = useContext(KeyContext)[0];

    //function
    const getAllOrders = async () => {
        await fetch("http://localhost:8000/orders/", {
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            }
        })
            .then(res => res.json())
            .then(data => setAllOrders(data))
            .catch(err => console.log(err));
    }

    const closeDetailsModal = () => setIsShowDetailsModal(false);
    const closeDeleteModal = () => setIsShowDeleteModal(false);
    const closeAcceptModal = () => setIsShowAcceptModal(false);
    const closeRejectModal = () => setIsShowRejectModal(false);

    const getMainOrderItems = async () => {
        await fetch(`http://localhost:8000/orders/detail/items/${mainOrderID}/`, {
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            }
        })
            .then(res => res.json())
            .then(data => setMainOrderItems(data))
            .catch(err => console.log(err));
    }

    const deleteModalSubmitAction = async () => {
        await fetch(`http://localhost:8000/orders/delete/${mainOrderID}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            }
        })
            .then(res => {
                if (res.ok) {
                    successNotification();
                    getAllOrders();
                } else {
                    errorNotification();
                    console.log(res);
                }
            })
            .catch(err => {
                errorNotification();
                console.log(err);
            });

        closeDeleteModal();
    }

    const acceptOrder = async () => {

        const newOrderInfos = new FormData();
        newOrderInfos.append("is_verified", true);

        await fetch(`http://localhost:8000/orders/update/${mainOrderID}/`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            },
            body: newOrderInfos,
        })
            .then(res => {
                if (res.ok) {
                    successNotification();
                    getAllOrders();
                } else {
                    errorNotification();
                    console.log(res);
                }
            })
            .catch(err => {
                errorNotification();
                console.log(err);
            });

        closeAcceptModal();

    }

    const rejectOrder = async () => {

        const newOrderInfos = new FormData();
        newOrderInfos.append("is_verified", false);

        await fetch(`http://localhost:8000/orders/update/${mainOrderID}/`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            },
            body: newOrderInfos,
        })
            .then(res => {
                if (res.ok) {
                    successNotification();
                    getAllOrders();
                } else {
                    errorNotification();
                    console.log(res);
                }
            })
            .catch(err => {
                errorNotification();
                console.log(err);
            });

        closeRejectModal();

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
                            <th>تایید شده</th>
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
                                    <td>{order.is_verified ? "تایید شده" : "تایید نشده"}</td>
                                    <td>{order.order_code}</td>
                                    <td className="[&>button]:btn !p-[5px]">
                                        <button className="blue-btn" onClick={() => {
                                            setMainOrderID(order.order_code);
                                            setIsShowDetailsModal(true);
                                            getMainOrderItems();
                                        }}>جزئیات
                                        </button>
                                        <button className="red-btn" onClick={() => {
                                            setMainOrderID(order.order_code);
                                            setIsShowDeleteModal(true);
                                        }}>حذف
                                        </button>
                                        {
                                            order.is_verified ? (
                                                <button className="bg-orange-500"
                                                        onClick={() => {
                                                            setMainOrderID(order.order_code);
                                                            setIsShowRejectModal(true);
                                                        }}>لغو تایید</button>
                                            ) : (
                                                <button className="green-btn" onClick={() => {
                                                    setMainOrderID(order.order_code);
                                                    setIsShowAcceptModal(true);
                                                }}>تایید
                                                </button>
                                            )
                                        }
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
                isShowDetailsModal && (
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

            {/* Delete Modal */}
            {
                isShowDeleteModal && <DeleteModal title="از حذف سفارش مطمئن هستید؟" cancelAction={closeDeleteModal}
                                                  submitAction={deleteModalSubmitAction}/>
            }

            {/* Accept Modal */}
            {
                isShowAcceptModal && <DeleteModal title="از تایید سفارش مطمئن هستید؟" cancelAction={closeAcceptModal}
                                                  submitAction={acceptOrder}/>
            }

            {/* Reject Modal */}
            {
                isShowRejectModal &&
                <DeleteModal title="از لغو تایید سفارش مطمئن هستید؟" cancelAction={closeRejectModal}
                             submitAction={rejectOrder}/>
            }
        </>
    );
}