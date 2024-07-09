import React from 'react';
import {AiOutlineBell} from 'react-icons/ai';
import {BsBrightnessHigh} from "react-icons/bs";

export default function Header() {
    //JSX
    return (
        <div className="Header">
            <div className="admin-profile">
                <img src="/images/admin-profile01.jpg" alt="admin profile"/>
                <div>
                    <h2>محمدرضا بهین کر</h2>
                    <h3>برنامه نویس</h3>
                </div>
            </div>

            <div className="header-left-section">
                <div className="search-box">
                    <input type="text" placeholder="جستجو کنید..."/>
                    <button>جستجو</button>

                    {/* Buttons */}
                    <button className="header-left-icon">
                        <AiOutlineBell/>
                    </button>
                    <button className="header-left-icon">
                        <BsBrightnessHigh/>
                    </button>
                </div>
            </div>
        </div>
    );
}