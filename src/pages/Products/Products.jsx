import React from 'react';
import ErrorBox from '../../Components/ErrorBox/ErrorBox';
import AddNewProduct from "../../Components/AddNewProduct/AddNewProduct";
import ProductsTable from '../../Components/ProductsTable/ProductsTable';

export default function Products() {
    //JSX
    return (
        <div>
            <AddNewProduct/>
            <ErrorBox message="هیچ محصولی یافت نشد."/>
            <ProductsTable/>
        </div>
    );
}