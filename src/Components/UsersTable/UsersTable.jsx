import React, {useState, useEffect} from 'react';
import ErrorBox from "../ErrorBox/ErrorBox";
import Loading from "../Loading/Loading";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import {toast} from "react-toastify";
import {MdInvertColors, MdOutlineProductionQuantityLimits} from "react-icons/md";
import {AiOutlineDollarCircle} from "react-icons/ai";
import {TbRosetteDiscountCheckFilled} from "react-icons/tb";
import {FaFire, FaImage, FaSellcast} from "react-icons/fa";

export default function UsersTable() {
    //state
    const [allUsers, setAllUsers] = useState(null);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [mainUserID, setMainUserID] = useState(null);

    //react-toastify package function
    const successNotification = () => toast.success("عملیات موفقیت آمیز بود.", {
        rtl: true,
        pauseOnHover: false,
        autoClose: 3000,
    });

    const errorNotification = () => toast.error("اوه، با خطا مواجه شدیم!", {
        rtl: true,
        pauseOnHover: false,
        autoClose: 3000,
    });

    //function
    const getAllUsers = async () => {

        await fetch("http://localhost:3000/api/users/")
            .then(res => res.json())
            .then(data => setAllUsers(data))
            .catch(err => console.log(err));

    }

    const closeDeleteModal = () => setIsShowDeleteModal(false);
    const closeEditModal = () => setIsShowEditModal(false);

    const deleteModalSubmitAction = () => {

        fetch(`http://localhost:3000/api/users/${mainUserID}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                successNotification();
                getAllUsers();
            })
            .catch(err => {
                errorNotification();
                console.log(err);
            })

        closeDeleteModal();
    }

    const editModalSubmitAction = () => {
        closeEditModal();
    }

    //useEffect
    useEffect(() => {
        getAllUsers();
    }, [])

    //JSX
    return (
        <>

            {
                allUsers === null ? (
                    <Loading/>
                ) : allUsers.length ? (
                    < table className="w-full bg-[var(--white)] mt-[30px] rounded-[10px]">
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

                        {
                            allUsers.map(user => (
                                <tr key={user.id}
                                    className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">
                                    <td>{user.firsname} {user.lastname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td className="[&>button]:btn !p-[5px]">
                                        <button className="blue-btn">جزئیات</button>
                                        <button className="red-btn" onClick={() => {
                                            setMainUserID(user.id);
                                            setIsShowDeleteModal(true)
                                        }}>حذف
                                        </button>
                                        <button className="green-btn" onClick={() => {
                                            setMainUserID(user.id);
                                            setIsShowEditModal(true);
                                        }}>ویرایش
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>
                ) : (
                    <ErrorBox message="هیچ کاربری یافت نشد."/>
                )

            }

            {/* Delete Modal */}
            {
                isShowDeleteModal && <DeleteModal cancelAction={closeDeleteModal} submitAction={deleteModalSubmitAction}
                                                  title="آیا از حذف مطمئن هستید؟"/>
            }

            {/* Edit Modal */}
            {
                isShowEditModal && (
                    <EditModal onClose={closeEditModal} onSubmit={editModalSubmitAction}>

                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-title-input">نام:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <MdOutlineProductionQuantityLimits/>
                            </span>
                                <input type="text" placeholder="نام جدید را وارد کنید" value={productNewTitle}
                                       onChange={e => setProductNewTitle(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-title-input"/>
                            </div>

                        </div>
                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-price-input">نام خانوادگی:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <AiOutlineDollarCircle/>
                            </span>
                                <input type="text" placeholder="نام خانوادگی جدید را وارد کنید" value={productNewPrice}
                                       onChange={e => setProductNewPrice(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-price-input"/>
                            </div>

                        </div>
                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-count-input">یوزرنیم:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <TbRosetteDiscountCheckFilled/>
                            </span>
                                <input type="text" placeholder="یوزرنیم جدید را وارد کنید" value={productNewCount}
                                       onChange={e => setProductNewCount(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-count-input"/>
                            </div>

                        </div>
                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-image-input">پسورد:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <FaImage/>
                            </span>
                                <input type="text" placeholder="پسورد جدید را وارد کنید" value={productNewImage}
                                       onChange={e => setProductNewImage(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-image-input"/>
                            </div>

                        </div>
                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-popularity-input">شماره تماس:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <FaFire/>
                            </span>
                                <input type="text" placeholder="شماره تماس جدید را وارد کنید" value={productNewPopularity}
                                       onChange={e => setProductNewPopularity(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-popularity-input"/>
                            </div>

                        </div>
                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-sale-input">شهر ساکن:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <FaSellcast/>
                            </span>
                                <input type="text" placeholder="شهر را وارد کنید" value={productNewSale}
                                       onChange={e => setProductNewSale(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-sale-input"/>
                            </div>

                        </div>
                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-colors-input">ایمیل:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <MdInvertColors/>
                            </span>
                                <input type="text" placeholder="ایمیل را وارد کنید" value={productNewColors}
                                       onChange={e => setProductNewColors(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-colors-input"/>
                            </div>


                        </div>

                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-colors-input">آدرس:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <MdInvertColors/>
                            </span>
                                <input type="text" placeholder="آدرس را وارد کنید" value={productNewColors}
                                       onChange={e => setProductNewColors(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-colors-input"/>
                            </div>


                        </div>

                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-colors-input">امتیاز:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <MdInvertColors/>
                            </span>
                                <input type="text" placeholder="امتیاز را وارد کنید" value={productNewColors}
                                       onChange={e => setProductNewColors(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-colors-input"/>
                            </div>


                        </div>

                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-colors-input">میزان خرید:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <MdInvertColors/>
                            </span>
                                <input type="text" placeholder="میزان خرید را وارد کنید" value={productNewColors}
                                       onChange={e => setProductNewColors(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-colors-input"/>
                            </div>


                        </div>

                    </EditModal>
                )
            }

        </>
    )
        ;
}