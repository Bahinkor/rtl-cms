import React from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';
import AddNewProduct from "../AddNewProduct/AddNewProduct";

export default function Products() {
    //JSX
    return (
        <div>
            <AddNewProduct/>
            <ErrorBox message="هیچ محصولی یافت نشد."/>
        </div>
    );
}