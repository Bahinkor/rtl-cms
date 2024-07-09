import React from 'react';

export default function SideBar() {
    // JSX
    return (
        <div className="flex-1 fixed h-full bg-[var(--blue)]">
            <h1 className="text-[1.4rem] text-[var(--white)] p-[15px] border-b border-solid border-[#6c48bb]">به داشبورد
                خود خوش آمدید</h1>

            <ul className="mt-5 [&>li]:relative [&>li]:p-[15px] [&>li>a]:flex [&>li>a]:items-center [&>li>a]:justify-start [&>li>a]:w-full [&>li>a]:text-[var(--white)] [&>li>a]:text-[1.3rem]">
                {/* sidebar-active-item is custom class (active item) */}
                <li className="mb-5">
                    <a href="#">صفحه اصلی</a>
                </li>
                <li className="sidebar-active-item">
                    <a href="#">محصولات</a>
                </li>
                <li>
                    <a href="#">کامنت ها</a>
                </li>
                <li>
                    <a href="#">کاربران</a>
                </li>
                <li>
                    <a href="#">صفحه اصلی</a>
                </li>
                <li>
                    <a href="#">سفارشات</a>
                </li>
                <li>
                    <a href="#">تخفیف ها</a>
                </li>
            </ul>
        </div>
    );
}