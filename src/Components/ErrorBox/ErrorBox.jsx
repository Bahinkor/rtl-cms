import React from 'react';

export default function ErrorBox({message}) {
    //JSX
    return (
        <div className="text-[2rem] text-[var(--white)] text-center bg-[#ff4f4f] mt-5 p-5">
            <h2>{message}</h2>
        </div>
    );
}