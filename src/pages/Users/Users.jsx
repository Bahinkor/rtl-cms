import React from 'react';
import UsersTable from "../../Components/UsersTable/UsersTable";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";

export default function Users() {
    //JSX
    return (
        <div className="mt-[60px] p-5 rounded-xl">
            <ErrorBox message="هیچ کاربری یافت نشد."/>
            <UsersTable/>
        </div>
    );
}