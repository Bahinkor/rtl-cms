import React from 'react';

export default function Loading() {
    //JSX
    return (
        <div
            className="text-[2rem] text-[var(--white)] dark:text-slate-200 text-center bg-blue-500 dark:bg-blue-900 mt-5 p-5">
            <h2>در حال بارگذاری...</h2>
        </div>
    )
}