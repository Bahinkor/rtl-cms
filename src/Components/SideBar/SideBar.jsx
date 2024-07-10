import React from 'react';
import {Link} from "react-router-dom";
import {AiOutlineHome} from "react-icons/ai";
import {MdProductionQuantityLimits} from "react-icons/md";
import {BiCommentDetail} from "react-icons/bi";
import {FiUsers} from "react-icons/fi";
import {BsBagCheck, BsCurrencyDollar} from "react-icons/bs";

export default function SideBar() {
    // JSX
    return (
        <div className="flex-1 fixed h-full bg-[var(--blue)]">
            <h1 className="text-[1.4rem] text-[var(--white)] p-[15px] border-b border-solid border-[#6c48bb]">به داشبورد
                خود خوش آمدید</h1>

            <ul className="mt-5 [&>li]:relative [&>li]:p-[15px] [&>li>a]:flex [&>li>a]:items-center [&>li>a]:justify-start [&>li>a]:w-full [&>li>a]:text-[var(--white)] [&>li>a]:text-[1.3rem]">
                {/* sidebar-active-item is custom class (active item) */}
                <li className="mb-5 hover:sidebar-active-item">
                    <Link to="/">
                        <AiOutlineHome className="ml-[8px]"/>
                        صفحه اصلی
                    </Link>
                </li>
                <li className="sidebar-active-item hover:sidebar-active-item hover:sidebar-active-item">
                    <Link to="/products">
                        <MdProductionQuantityLimits className="ml-[8px]"/>
                        محصولات
                    </Link>
                </li>
                <li className="hover:sidebar-active-item">
                    <Link to="/comments">
                        <BiCommentDetail className="ml-[8px]"/>
                        کامنت ها
                    </Link>
                </li>
                <li className="hover:sidebar-active-item">
                    <Link to="/users">
                        <FiUsers className="ml-[8px]"/>
                        کاربران
                    </Link>
                </li>
                <li className="hover:sidebar-active-item">
                    <Link to="/orders">
                        <BsBagCheck className="ml-[8px]"/>
                        سفارشات
                    </Link>
                </li>
                <li className="hover:sidebar-active-item">
                    <Link to="/offs">
                        <BsCurrencyDollar className="ml-[8px]"/>
                        تخفیف ها
                    </Link>
                </li>
            </ul>
        </div>
    );
}