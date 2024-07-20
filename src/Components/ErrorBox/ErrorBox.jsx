import React from 'react';

export default function ErrorBox({message}) {
    //JSX
    return (
        <div
            className="text-[2rem] text-[var(--white)] dark:text-slate-200 text-center bg-[#ff4f4f] dark:bg-red-900 mt-5 p-5">
            <h2>{message}</h2>
        </div>
    );
}