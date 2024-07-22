import React from 'react';
import {NavLink} from "react-router-dom";
import {AiOutlineHome} from "react-icons/ai";
import {MdProductionQuantityLimits} from "react-icons/md";
import {BiCommentDetail} from "react-icons/bi";
import {FiUsers} from "react-icons/fi";
import {BsBagCheck, BsCurrencyDollar} from "react-icons/bs";
import "./style.css"

export default function SideBar() {

    // JSX
    return (
        <div className="flex-1 fixed h-full bg-[var(--blue)] dark:text-slate-200">
            <h1 className="text-[1.4rem] text-[var(--white)] p-[15px] border-b border-solid border-[#6c48bb]">به داشبورد
                خود خوش آمدید</h1>

            <ul className="mt-5 [&>a]:relative [&>a]:flex [&>a]:items-center [&>a]:justify-start [&>a]:w-full [&>a]:text-[var(--white)] [&>a]:text-[1.3rem] [&>a]:p-[15px]">
                <NavLink to="/" className="mb-5 hover:sidebar-active-item">
                    <AiOutlineHome className="ml-[8px]"/>
                    صفحه اصلی
                </NavLink>
                <NavLink to="/products" className="hover:sidebar-active-item">
                    <MdProductionQuantityLimits className="ml-[8px]"/>
                    محصولات
                </NavLink>
                <NavLink to="/comments" className="hover:sidebar-active-item">
                    <BiCommentDetail className="ml-[8px]"/>
                    کامنت ها
                </NavLink>
                <NavLink to="/users" className="hover:sidebar-active-item">
                    <FiUsers className="ml-[8px]"/>
                    کاربران
                </NavLink>
                <NavLink to="/orders" className="hover:sidebar-active-item">
                    <BsBagCheck className="ml-[8px]"/>
                    سفارشات
                </NavLink>
                <NavLink to="/discounts" className="hover:sidebar-active-item">
                    <BsCurrencyDollar className="ml-[8px]"/>
                    تخفیف ها
                </NavLink>
            </ul>
        </div>
    );
}