import React, {useState, useEffect} from 'react';
import ErrorBox from "../ErrorBox/ErrorBox";
import Loading from "../Loading/Loading";
import {toast} from "react-toastify";

export default function UsersTable() {
    //state
    const [allUsers, setAllUsers] = useState(null);

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
                                        <button className="red-btn">حذف</button>
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

        </>
    )
        ;
}