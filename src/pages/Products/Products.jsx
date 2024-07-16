import React, {useState, useEffect} from 'react';
import AddNewProduct from '../../Components/AddNewProduct/AddNewProduct';
import ProductsTable from '../../Components/ProductsTable/ProductsTable';
//react-toastify package
import {ToastContainer, toast} from "react-toastify";
//styles
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
    //react-toastify package variables
    const errorNotification = () => toast.error("!اوه، با خطا مواجه شدیم");

    //state (all products)
    const [allProducts, setAllProducts] = useState(null);

    // Get all products (API)
    const getAllProducts = async () => {
        await fetch("http://localhost:3000/api/products/")
            .then(res => res.json())
            .then(data => setAllProducts(data))
            .catch(err => {
                errorNotification();
                console.log(err);
            });
    }

    //useEffect
    useEffect(() => {
        // call function
        getAllProducts();
    }, [])


    //JSX
    return (
        <div>
            <AddNewProduct getAllProducts={getAllProducts}/>
            <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts}/>

            {/* Notification Modal */}
            <div className="text-right">
                <ToastContainer/>
            </div>
        </div>
    );
}