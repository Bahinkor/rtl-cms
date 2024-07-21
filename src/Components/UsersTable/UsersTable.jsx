import React, {useState, useEffect} from 'react';
import ErrorBox from "../ErrorBox/ErrorBox";
import Loading from "../Loading/Loading";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import DetailModal from "../DetailsModal/DetailsModal";
import {toast} from "react-toastify";
import {MdInvertColors, MdOutlineProductionQuantityLimits} from "react-icons/md";
import {AiOutlineDollarCircle} from "react-icons/ai";
import {TbRosetteDiscountCheckFilled} from "react-icons/tb";
import {FaFire, FaImage, FaSellcast} from "react-icons/fa";
import DetailsModal from "../DetailsModal/DetailsModal";

export default function UsersTable() {
    //state
    const [allUsers, setAllUsers] = useState(null);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
    const [mainUserDetailInfos, setMainUserDetailInfos] = useState({});
    const [mainUserID, setMainUserID] = useState(null);

    const [newUserFirstName, setNewUserFirstName] = useState("");
    const [newUserLastName, setNewUserLastName] = useState("");
    const [newUserUsername, setNewUserUsername] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserPhone, setNewUserPhone] = useState("");
    const [newUserCity, setNewUserCity] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserAddress, setNewUserAddress] = useState("");
    const [newUserScore, setNewUserScore] = useState("");
    const [newUserBuy, setNewUserBuy] = useState("");

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

        await fetch("http://localhost:8000/users/", {
            headers: {
                "Authorization": "Token 502387428aee0698042273c57145ed5aea88cadb",
            }
        })
            .then(res => res.json())
            .then(data => setAllUsers(data))
            .catch(err => console.log(err));

    }

    const closeDeleteModal = () => setIsShowDeleteModal(false);
    const closeEditModal = () => setIsShowEditModal(false);
    const closeDetailsModal = () => setIsShowDetailsModal(false);

    const deleteModalSubmitAction = async () => {

        await fetch(`http://localhost:8000/users/delete/${mainUserID}/`, {
            method: "DELETE",
            headers: {
                "Authorization": "Token 502387428aee0698042273c57145ed5aea88cadb",
            }
        })
            .then(res => {
                if (res.ok) {
                    successNotification();
                    getAllUsers();
                } else {
                    errorNotification();
                    console.log(res);
                }
            })
            .catch(err => {
                errorNotification();
                console.log(err);
            })

        closeDeleteModal();
    }

    const editModalSubmitAction = async () => {

        const newUserInfos = new FormData();
        newUserInfos.append("username", newUserUsername);
        newUserInfos.append("first_name", newUserFirstName);
        newUserInfos.append("last_name", newUserLastName);
        newUserInfos.append("phone", newUserPhone);
        newUserInfos.append("city", newUserCity);
        newUserInfos.append("email", newUserEmail);
        newUserInfos.append("address", newUserAddress);
        newUserInfos.append("score", newUserScore);
        newUserInfos.append("buy", newUserBuy);
        newUserInfos.append("user_code", mainUserID);

        await fetch(`http://localhost:8000/users/update/${mainUserID}/`, {
            method: "PUT",
            headers: {
                "Authorization": "Token 502387428aee0698042273c57145ed5aea88cadb",
            },
            body: newUserInfos
        })
            .then(res => {
                if (res.ok) {
                    successNotification();
                    getAllUsers();
                } else {
                    errorNotification();
                    console.log(res);
                }
            })
            .catch(err => {
                errorNotification();
                console.log(err);
            })

        closeEditModal();
    }

    const updateEditModalItems = (user) => {
        setNewUserFirstName(user.first_name);
        setNewUserLastName(user.last_name);
        setNewUserUsername(user.username);
        setNewUserPhone(user.phone);
        setNewUserCity(user.city);
        setNewUserEmail(user.email);
        setNewUserAddress(user.address);
        setNewUserScore(user.username);
        setNewUserBuy(user.buy);
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
                    < table
                        className="w-full bg-[var(--white)] dark:bg-slate-800 dark:text-slate-200 mt-[30px] rounded-[10px]">
                        {/* table header */}
                        <thead>
                        <tr className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">
                            <th>نام و نام خانوادگی</th>
                            <th>یوزرنیم</th>
                            <th>شهر</th>
                            <th>شماره تماس</th>
                            <th>ایمیل</th>
                            <th>اکشن</th>
                        </tr>
                        </thead>

                        {/* Users list */}
                        <tbody>

                        {
                            allUsers.map(user => (
                                <tr key={user.user_code}
                                    className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.city}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td className="[&>button]:btn !p-[5px]">
                                        <button className="blue-btn" onClick={() => {
                                            setIsShowDetailsModal(true);
                                            setMainUserDetailInfos(user);
                                        }}>جزئیات
                                        </button>
                                        <button className="red-btn" onClick={() => {
                                            setMainUserID(user.user_code);
                                            setIsShowDeleteModal(true);
                                        }}>حذف
                                        </button>
                                        <button className="green-btn" onClick={() => {
                                            setMainUserID(user.user_code);
                                            setIsShowEditModal(true);
                                            updateEditModalItems(user);
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

            {/* Details Modal */}
            {
                isShowDetailsModal && (
                    <DetailsModal onClose={closeDetailsModal}>
                        <table className="w-full bg-[var(--white)] mt-5 rounded-[10px]">

                            <thead>
                            <tr className="text-center [&>*]:p-5">
                                <th>شهر</th>
                                <th>آدرس</th>
                                <th>امتیاز</th>
                                <th>میزان خرید</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr className="text-center [&>*]:p-5">
                                <td>{mainUserDetailInfos.city}</td>
                                <td>{mainUserDetailInfos.address}</td>
                                <td>{mainUserDetailInfos.score}</td>
                                <td>{mainUserDetailInfos.buy.toLocaleString()} تومان</td>
                            </tr>
                            </tbody>

                        </table>
                    </DetailsModal>
                )
            }

            {/* Edit Modal */}
            {
                isShowEditModal && (
                    <EditModal submitAction={editModalSubmitAction} onClose={closeEditModal}>

                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-title-input">نام:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <MdOutlineProductionQuantityLimits/>
                            </span>
                                <input type="text" placeholder="نام جدید را وارد کنید" value={newUserFirstName}
                                       onChange={e => setNewUserFirstName(e.target.value)}
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
                                <input type="text" placeholder="نام خانوادگی جدید را وارد کنید" value={newUserLastName}
                                       onChange={e => setNewUserLastName(e.target.value)}
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
                                <input type="text" placeholder="یوزرنیم جدید را وارد کنید" value={newUserUsername}
                                       onChange={e => setNewUserUsername(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-count-input"/>
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
                                <input type="text" placeholder="شماره تماس جدید را وارد کنید" value={newUserPhone}
                                       onChange={e => setNewUserPhone(e.target.value)}
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
                                <input type="text" placeholder="شهر را وارد کنید" value={newUserCity}
                                       onChange={e => setNewUserCity(e.target.value)}
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
                                <input type="text" placeholder="ایمیل را وارد کنید" value={newUserEmail}
                                       onChange={e => setNewUserEmail(e.target.value)}
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
                                <input type="text" placeholder="آدرس را وارد کنید" value={newUserAddress}
                                       onChange={e => setNewUserAddress(e.target.value)}
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
                                <input type="text" placeholder="امتیاز را وارد کنید" value={newUserScore}
                                       onChange={e => setNewUserScore(e.target.value)}
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
                                <input type="text" placeholder="میزان خرید را وارد کنید" value={newUserBuy}
                                       onChange={e => setNewUserBuy(e.target.value)}
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