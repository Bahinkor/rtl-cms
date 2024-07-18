import React, {useState, useEffect} from 'react';
import ErrorBox from "../ErrorBox/ErrorBox";
import Loading from "../Loading/Loading";
import DeleteModal from "../DeleteModal/DeleteModal";
import {toast} from "react-toastify";

export default function UsersTable() {
    //state
    const [allUsers, setAllUsers] = useState(null);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(null);
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
                                        <button className="green-btn">ویرایش</button>
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

        </>
    )
        ;
}