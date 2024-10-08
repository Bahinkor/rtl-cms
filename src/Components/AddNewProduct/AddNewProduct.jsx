import React, {useState, useContext} from 'react';
import {FaDollarSign, FaImage, FaFire, FaSellcast} from "react-icons/fa";
import {MdOutlineProductionQuantityLimits, MdInvertColors} from "react-icons/md";
import {TbRosetteDiscountCheckFilled} from "react-icons/tb";
import {KeyContext} from "../../context-api/GetKeyValueContext";
//react-toastify package
import {successNotification, errorNotification} from "../../react-toastify/react-toastify";


export default function AddNewProduct({getAllProducts}) {
    //state
    const [newProductTitle, setNewProductTitle] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductCount, setNewProductCount] = useState("");
    const [newProductImage, setNewProductImage] = useState(null);
    const [newProductPopularity, setNewProductPopularity] = useState("");
    const [newProductSale, setNewProductSale] = useState("");
    const [newProductColors, setNewProductColors] = useState("");

    //context
    const keyValue = useContext(KeyContext)[0];

    //functions
    const clearInputValues = () => {
        setNewProductTitle("");
        setNewProductPrice("");
        setNewProductCount("");
        setNewProductImage("");
        setNewProductPopularity("");
        setNewProductSale("");
        setNewProductColors("");
    }

    const addNewProduct = () => {

        const newProductInfos = new FormData();
        newProductInfos.append("title", newProductTitle);
        newProductInfos.append("price", newProductPrice);
        newProductInfos.append("count", newProductCount);
        newProductInfos.append("image", newProductImage);
        newProductInfos.append("popularity", newProductPopularity);
        newProductInfos.append("sale_amount", newProductSale);
        newProductInfos.append("colors", newProductColors);

        fetch("http://localhost:8000/products/add/", {
            method: "POST",
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            },
            body: newProductInfos
        })
            .then(res => {
                if (res.ok) {
                    successNotification();
                    getAllProducts();
                    clearInputValues();
                } else {
                    errorNotification();
                    console.log(res);
                    clearInputValues();
                }
            })
            .catch(err => {
                errorNotification();
                console.log(err);
                clearInputValues();
            })

    }


    //JSX
    return (
        <div className="mt-[60px]">
            <h2 className="text-[2rem] dark:text-slate-200">افزودن محصول جدید</h2>

            <form className="flex flex-col items-end bg-[var(--white)] dark:bg-slate-800 p-5 mt-[30px] rounded-[20px]"
                  onSubmit={e => e.preventDefault()}>
                <div
                    className="grid grid-cols-2 gap-y-[10px] gap-x-[15px] w-full [&>div]:flex [&>div]:items-center [&>div]:gap-y-[10px] [&>div]:w-full [&>div]:bg-[#f4f4f4] [&>div]:dark:bg-slate-600 [&>div]:dark:text-slate-200 [&>div]:px-5 [&>div]:rounded-[10px]">
                    {/* form inputs */}

                    <div>
                        <MdOutlineProductionQuantityLimits/>
                        <input type="text" placeholder="اسم محصول را بنویسید"
                               value={newProductTitle}
                               onChange={e => setNewProductTitle(e.target.value)}
                               className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"/>
                    </div>
                    {/*  */}
                    <div>
                        <FaDollarSign/>
                        <input type="text" placeholder="قیمت محصول را بنویسید"
                               value={newProductPrice}
                               onChange={e => setNewProductPrice(e.target.value)}
                               className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"/>
                    </div>
                    {/*  */}
                    <div>
                        <TbRosetteDiscountCheckFilled/>
                        <input type="text" placeholder="موجودی محصول را بنویسید"
                               value={newProductCount}
                               onChange={e => setNewProductCount(e.target.value)}
                               className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"/>
                    </div>
                    {/*  */}
                    <div>
                        <FaImage/>
                        <input type="file" onChange={e => setNewProductImage(e.target.files[0])}
                               className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"/>
                    </div>
                    {/*  */}
                    <div>
                        <FaFire/>
                        <input type="text" placeholder="میزان محبوبیت محصول را بنویسید"
                               value={newProductPopularity}
                               onChange={e => setNewProductPopularity(e.target.value)}
                               className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"/>
                    </div>
                    {/*  */}
                    <div>
                        <FaSellcast/>
                        <input type="text" placeholder="میزان فروش محصول را بنویسید"
                               value={newProductSale}
                               onChange={e => setNewProductSale(e.target.value)}
                               className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"/>
                    </div>
                    {/*  */}
                    <div>
                        <MdInvertColors/>
                        <input type="text" placeholder="اسامی رنگ بندی محصول را بنویسید"
                               value={newProductColors}
                               onChange={e => setNewProductColors(e.target.value)}
                               className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"/>
                    </div>

                </div>
                <button
                    className="text-[1.1rem] text-[var(--white)] dark:text-slate-200 bg-[var(--blue)] py-[10px] px-5 mt-[10px] rounded-[10px]"
                    onClick={addNewProduct}>
                    ثبت محصول
                </button>
            </form>

        </div>
    );
}