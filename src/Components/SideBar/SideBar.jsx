import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {AiOutlineHome} from "react-icons/ai";
import {MdProductionQuantityLimits} from "react-icons/md";
import {BiCommentDetail} from "react-icons/bi";
import {FiUsers} from "react-icons/fi";
import {BsBagCheck, BsCurrencyDollar} from "react-icons/bs";

export default function SideBar() {
    //state
    const [activeItem, setActiveItem] = useState(null);


    // JSX
    return (
        <div className="flex-1 fixed h-full bg-[var(--blue)]">
            <h1 className="text-[1.4rem] text-[var(--white)] p-[15px] border-b border-solid border-[#6c48bb]">به داشبورد
                خود خوش آمدید</h1>

            <ul className="mt-5 [&>li]:relative [&>li]:p-[15px] [&>li>a]:flex [&>li>a]:items-center [&>li>a]:justify-start [&>li>a]:w-full [&>li>a]:text-[var(--white)] [&>li>a]:text-[1.3rem]">
                {/* sidebar-active-item is custom class (active item) */}
                <li className={`mb-5 hover:sidebar-active-item ${activeItem === "home" ? "sidebar-active-item" : ""}`}
                    onClick={() => setActiveItem("home")}>
                    <Link to="/">
                        <AiOutlineHome className="ml-[8px]"/>
                        صفحه اصلی
                    </Link>
                </li>
                <li className={`hover:sidebar-active-item ${activeItem === "products" ? "sidebar-active-item" : ""}`}
                    onClick={() => setActiveItem("products")}>
                    <Link to="/products">
                        <MdProductionQuantityLimits className="ml-[8px]"/>
                        محصولات
                    </Link>
                </li>
                <li className={`hover:sidebar-active-item ${activeItem === "comments" ? "sidebar-active-item" : ""}`}
                    onClick={() => setActiveItem("comments")}>
                    <Link to="/comments">
                        <BiCommentDetail className="ml-[8px]"/>
                        کامنت ها
                    </Link>
                </li>
                <li className={`hover:sidebar-active-item ${activeItem === "users" ? "sidebar-active-item" : ""}`}
                    onClick={() => setActiveItem("users")}>
                    <Link to="/users">
                        <FiUsers className="ml-[8px]"/>
                        کاربران
                    </Link>
                </li>
                <li className={`hover:sidebar-active-item ${activeItem === "orders" ? "sidebar-active-item" : ""}`}
                    onClick={() => setActiveItem("orders")}>
                    <Link to="/orders">
                        <BsBagCheck className="ml-[8px]"/>
                        سفارشات
                    </Link>
                </li>
                <li className={`hover:sidebar-active-item ${activeItem === "offs" ? "sidebar-active-item" : ""}`}
                    onClick={() => setActiveItem("offs")}>
                    <Link to="/offs">
                        <BsCurrencyDollar className="ml-[8px]"/>
                        تخفیف ها
                    </Link>
                </li>
            </ul>
        </div>
    );
}