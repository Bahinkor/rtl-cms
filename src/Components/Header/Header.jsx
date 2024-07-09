import React from 'react';
import {AiOutlineBell} from 'react-icons/ai';
import {BsBrightnessHigh} from "react-icons/bs";

export default function Header() {
    //JSX
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-5">
                <img src="/images/admin-profile01.jpg" alt="admin profile" className="w-[50px] rounded-full"/>
                <div className="flex flex-col">
                    <h2 className="text-[1.2rem]">محمدرضا بهین کر</h2>
                    <h3 className="text-[#858585]">برنامه نویس</h3>
                </div>
            </div>

            <div
                className="flex gap-5 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:size-10 [&>button]:p-[10px] [&>button]:bg-[var(--blue)] [&>button]:text-[var(--white)] [&>button]:rounded-[10px] [&>button]:search-box-shadow">
                {/* search box */}
                {/* search-box-shadow is custom class */}
                <div
                    className="flex items-center justify-between w-[400px] h-[45px] bg-[var(--white)] pl-[5px] rounded-[15px] overflow-hidden search-box-shadow">
                    <input type="text" placeholder="جستجو کنید..."
                           className="w-full text-[1.1rem] py-[10px] pl-[10px] pr-[20px] outline-none focus:outline-none"/>
                    <button
                        className="flex w-[100px] bg-[var(--blue)] text-[1.1rem] text-[var(--white)] py-[3px] px-[20px] rounded-[10px]">جستجو
                    </button>
                </div>

                {/* Buttons */}
                <button className="header-left-icon">
                    <AiOutlineBell/>
                </button>
                <button className="header-left-icon">
                    <BsBrightnessHigh/>
                </button>
            </div>
        </div>
    );
}