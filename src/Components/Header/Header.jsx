import React, {useEffect, useState, useContext} from 'react';
import DeleteModal from "../DeleteModal/DeleteModal";
import {isShowMobileMenu} from "../../context-api/IsShowMobileMenuContext";
import {AiOutlineBell} from 'react-icons/ai';
import {BsBrightnessHigh} from "react-icons/bs";
import {IoIosLogOut, IoIosMenu} from "react-icons/io";
import {LuMoonStar} from "react-icons/lu";
import {Link} from "react-router-dom";
import {internetError} from "../../react-toastify/react-toastify";

export default function Header() {
    //state
    const [isShowLogoutModal, setIsShowLogoutModal] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    //context (Mobile Menu)
    const {isOpen, setIsOpen} = useContext(isShowMobileMenu);

    //function
    const closeLogoutModal = () => setIsShowLogoutModal(false);

    const logoutModalAction = () => {
        localStorage.removeItem("key");
        window.location.href = "/login";
    }

    const setDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "false");
        }
    }

    // Get User Info
    const getUserInfo = async () => {
        // Local Storage
        const keyValue = localStorage.getItem("key");

        await fetch("http://localhost:8000/users/detail/", {
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else if (!res.ok) {
                    localStorage.removeItem("key");
                    window.location.href = "/login";
                }
            })
            .then(data => {
                if (data) {
                    setUserInfo(data)
                }
            })
            .catch(err => {
                console.log(err);
                internetError();
            });
    }

    // useEffect
    useEffect(() => {
        if (window.location.pathname !== "/login") {
            getUserInfo();
        }
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem("darkMode");
        if (savedTheme === "true") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    useEffect(() => {
        setDarkMode();
    }, [isDarkMode]);

    //JSX
    return (
        <>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <img src="/images/profile-img/default-profile.png" alt="admin profile"
                         className="w-[50px] rounded-full"/>
                    <div className="flex flex-col">
                        <h2 className="text-[1.2rem] dark:text-slate-200">{userInfo.first_name} {userInfo.last_name}</h2>
                        <h3 className="text-[#858585]">{userInfo.username}</h3>
                    </div>
                </div>

                <div
                    className="flex gap-5">
                    {/* search box */}
                    {/* search-box-shadow is custom class */}
                    <div
                        className="hidden lg:flex items-center justify-between w-[400px] h-[45px] bg-[var(--white)] dark:bg-slate-600 pl-[5px] rounded-[15px] overflow-hidden search-box-shadow">
                        <input type="text" placeholder="جستجو کنید..."
                               className="w-full dark:bg-slate-600 dark:text-slate-200 text-[1.1rem] py-[10px] pl-[10px] pr-[20px] outline-none focus:outline-none"/>
                        <button
                            className="flex w-[100px] bg-[var(--blue)] dark:text-slate-200 text-[1.1rem] text-[var(--white)] py-[3px] px-[20px] rounded-[10px]">جستجو
                        </button>
                    </div>

                    {/* Buttons */}
                    <Link to="*" className="header-item" title="اعلان ها">
                        <AiOutlineBell/>
                    </Link>
                    <button className="header-item" title="تغییر تم" onClick={() => setIsDarkMode(!isDarkMode)}>
                        {
                            isDarkMode ? <BsBrightnessHigh/> : <LuMoonStar/>
                        }
                    </button>
                    <button className="header-item" title="خروج" onClick={() => setIsShowLogoutModal(true)}>
                        <IoIosLogOut/>
                    </button>
                    {/* Mobile menu button */}
                    <button className="header-item fixed top-[75px] left-[20px] md:hidden" title="منو" onClick={() => {
                        setIsOpen(!isOpen);
                    }}>
                        <IoIosMenu size={40}/>
                    </button>
                </div>
            </div>

            {/* Logout Modal */}
            {
                isShowLogoutModal && <DeleteModal cancelAction={closeLogoutModal} submitAction={logoutModalAction}
                                                  title="قصد خروج از اکانت را دارید؟"/>
            }
        </>
    );
}