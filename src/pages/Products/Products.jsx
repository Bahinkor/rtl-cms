import React from 'react';
import AddNewProduct from '../../Components/AddNewProduct/AddNewProduct';
import ProductsTable from '../../Components/ProductsTable/ProductsTable';

export default function Products() {
    //JSX
    return (
        <div>
            <AddNewProduct/>
            <ProductsTable/>
        </div>
    );
}