import React, {useState, useEffect, useRef} from 'react';

export default function Login() {
    //state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //Ref
    const usernameInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    //function
    const passwordInputFocus = (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            passwordInputRef.current.focus();
        }
    }

    const submitAction = () => {
        console.log("submited")
    }

    //useEffect
    useEffect(() => {
        usernameInputRef.current.focus();
    }, [])

    //JSX
    return (
        <div className="size-full flex items-center justify-center">
            <div
                className="flex flex-col justify-center w-[20rem] h-[25rem] bg-blue-500 border-[1px] border-solid border-blue-700 rounded-xl">
                <h2 className="text-3xl text-center mb-8">خوش آمدید!</h2>
                <form
                    className="flex flex-col justify-center gap-3 px-5 [&>input]:pr-2 [&>*]:h-8 [&>*]:rounded-[10px] [&>*]:outline-none"
                    onSubmit={e => e.preventDefault()}>
                    <input type="text" ref={usernameInputRef} placeholder="لطفا یوزرنیم خود را وارد نمایید"
                           value={username}
                           onChange={e => setUsername(e.target.value)} onKeyDown={e => passwordInputFocus(e)}/>
                    <input type="password" ref={passwordInputRef} placeholder="لطفا پسورد خود را وارد نمایید"
                           value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <button type="submit" className="w-full bg-red-500 text-white" onClick={submitAction}>ورود</button>
                </form>
            </div>
        </div>
    );
}