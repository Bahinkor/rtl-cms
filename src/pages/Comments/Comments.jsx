import React from 'react';
import CommentsTable from '../../Components/CommentsTable/CommentsTable';
import ErrorBox from "../../Components/ErrorBox/ErrorBox";

export default function Comments() {
    //JSX
    return (
        <div className="mt-[60px] p-5 rounded-xl">
            <ErrorBox message="هیچ کامنتی یافت نشد."/>
            <CommentsTable/>
        </div>
    );
}