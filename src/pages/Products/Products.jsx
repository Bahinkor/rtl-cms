import React, {useState, useEffect, useContext} from 'react';
import AddNewProduct from '../../Components/AddNewProduct/AddNewProduct';
import ProductsTable from '../../Components/ProductsTable/ProductsTable';
import {KeyContext} from "../../context-api/GetKeyValueContext";
//react-toastify package
import {ToastContainer, toast} from "react-toastify";
//styles
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
    //state (all products)
    const [allProducts, setAllProducts] = useState(null);

    //context
    const keyValue = useContext(KeyContext)[0];

    // Get all products (API)
    const getAllProducts = async () => {
        await fetch("http://localhost:8000/products/", {
            method: "GET",
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            }
        })
            .then(res => res.json())
            .then(data => setAllProducts(data))
            .catch(err => console.log(err));
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