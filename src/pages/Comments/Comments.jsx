import React from 'react';
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";

export default function Comments() {
    //JSX
    return (
        <div>
            <ErrorBox message="هیچ کامنتی یافت نشد."/>
            <DeleteModal/>
        </div>
    );
}