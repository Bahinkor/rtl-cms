import React from 'react';

export default function Login() {
    //JSX
    return (
        <div className="size-full flex items-center justify-center">
            <div className="w-[20rem] h-[25rem] bg-green-400 rounded-xl">
                <h2 className="text-2xl text-center my-8">خوش آمدید!</h2>
                <form className="flex flex-col justify-center gap-3 px-5 [&>*]:outline-none" onSubmit={e => e.preventDefault()}>
                    <input type="text" placeholder="لطفا یوزرنیم خود را وارد نمایید"/>
                    <input type="password" placeholder="لطفا پسورد خود را وارد نمایید"/>
                    <button type="submit">ورود</button>
                </form>
            </div>
        </div>
    );
}