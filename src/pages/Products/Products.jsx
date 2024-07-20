import React, {useState, useEffect} from 'react';
import AddNewProduct from '../../Components/AddNewProduct/AddNewProduct';
import ProductsTable from '../../Components/ProductsTable/ProductsTable';
//react-toastify package
import {ToastContainer, toast} from "react-toastify";
//styles
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
    //state (all products)
    const [allProducts, setAllProducts] = useState(null);

    // Get all products (API)
    const getAllProducts = async () => {
        await fetch("http://localhost:8000/products/", {
            method: "GET",
            headers: {
                "Authorization": "Token 502387428aee0698042273c57145ed5aea88cadb",
            }
        })
            .then(res => res.json())
            .then(data => setAllProducts(data))
            .catch(err => {
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