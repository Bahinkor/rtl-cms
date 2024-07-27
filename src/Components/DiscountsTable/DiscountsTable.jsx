import React, {useState, useEffect, useContext} from 'react';
import Loading from '../Loading/Loading';
import ErrorBox from '../ErrorBox/ErrorBox';
import {KeyContext} from "../../context-api/GetKeyValueContext";
import DeleteModal from "../DeleteModal/DeleteModal";
import {errorNotification, successNotification} from "../../react-toastify/react-toastify";


export default function DiscountsTable({getAllDiscounts, allDiscounts, setAllDiscounts}) {
    //state
    const [mainDiscountID, setMainDiscountID] = useState(null);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
    const [isShowRejectModal, setIsShowRejectModal] = useState(false);


    //context
    const keyValue = useContext(KeyContext)[0];

    //function
    const closeDeleteModal = () => setIsShowDeleteModal(false);
    const closeAcceptModal = () => setIsShowAcceptModal(false);
    const closeRejectModal = () => setIsShowRejectModal(false);

    const deleteModalSubmitAction = async () => {

        await fetch(`http://localhost:8000/discounts/delete/${mainDiscountID}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            }
        })
            .then(res => {
                if (res.ok) {
                    successNotification();
                    getAllDiscounts();
                } else {
                    errorNotification();
                    console.log(res)
                }
            })
            .catch(err => {
                errorNotification();
                console.log(err);
            });

        closeDeleteModal();
    }

    const acceptDiscount = async () => {
        const newDiscountInfos = new FormData();
        newDiscountInfos.append("is_active", true);

        await fetch(`http://localhost:8000/discounts/update/${mainDiscountID}/`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            },
            body: newDiscountInfos,
        })
            .then(res => {
                if (res.ok) {
                    successNotification();
                    getAllDiscounts();
                } else {
                    errorNotification();
                    console.log(res)
                }
            })
            .catch(err => {
                errorNotification();
                console.log(err);
            });

        closeAcceptModal();
    }

    const rejectDiscount = async () => {
        const newDiscountInfos = new FormData();
        newDiscountInfos.append("is_active", false);

        await fetch(`http://localhost:8000/discounts/update/${mainDiscountID}/`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            },
            body: newDiscountInfos,
        })
            .then(res => {
                if (res.ok) {
                    successNotification();
                    getAllDiscounts();
                } else {
                    errorNotification();
                    console.log(res)
                }
            })
            .catch(err => {
                errorNotification();
                console.log(err);
            });

        closeRejectModal();
    }

    //useEffect
    useEffect(() => {
        getAllDiscounts();
    }, [])

    //JSX
    return (
        <>
            {
                allDiscounts === null ? (
                    <Loading/>
                ) : allDiscounts.length ? (
                    < table
                        className="w-full bg-[var(--white)] dark:bg-slate-800 dark:text-slate-200 mt-[30px] rounded-[10px]">
                        {/* table header */}
                        <thead>
                        <tr className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">
                            <th>سازنده</th>
                            <th>تایتل</th>
                            <th>وضعیت</th>
                            <th>درصد تخفیف</th>
                            <th>کد تخفیف</th>
                            <th>اکشن</th>
                        </tr>
                        </thead>

                        {/* Users list */}
                        <tbody>

                        {
                            allDiscounts.map(discount => (
                                <tr key={discount.discount_code}
                                    className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">
                                    <td>{discount.author.username}</td>
                                    <td>{discount.title}</td>
                                    <td>{discount.is_active ? "فعال" : "غیرفعال"}</td>
                                    <td>{discount.percent}%</td>
                                    <td>{discount.key}</td>
                                    <td className="[&>button]:btn !p-[5px]">
                                        {
                                            discount.is_active ? (
                                                <button className="bg-orange-500"
                                                        onClick={() => {
                                                            setMainDiscountID(discount.discount_code);
                                                            setIsShowRejectModal(true);
                                                        }}>غیرفعالسازی</button>
                                            ) : (
                                                <button className="green-btn" onClick={() => {
                                                    setMainDiscountID(discount.discount_code);
                                                    setIsShowAcceptModal(true);
                                                }}>فعالسازی
                                                </button>
                                            )
                                        }
                                        <button className="red-btn" onClick={() => {
                                            setMainDiscountID(discount.discount_code);
                                            setIsShowDeleteModal(true);
                                        }}>حذف
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>
                ) : (
                    <ErrorBox message="هیچ تخفیفی یافت نشد."/>
                )
            }

            {/* Delete Modal */}
            {
                isShowDeleteModal && <DeleteModal title="آیا از حذف مطمئن هستید؟" cancelAction={closeDeleteModal}
                                                  submitAction={deleteModalSubmitAction}/>
            }

            {/* Accept Modal */}
            {
                isShowAcceptModal &&
                <DeleteModal title="آیا از فعالسازی تخفیف مطمئن هستید؟" cancelAction={closeAcceptModal}
                             submitAction={acceptDiscount}/>
            }

            {/* Delete Modal */}
            {
                isShowRejectModal &&
                <DeleteModal title="آیا از غیرفعالسازی تخفیف مطمئن هستید؟" cancelAction={closeRejectModal}
                             submitAction={rejectDiscount}/>
            }
        </>
    );
}