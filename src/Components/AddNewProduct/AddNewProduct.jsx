import React, {useState} from 'react';
import {FaDollarSign, FaImage, FaFire, FaSellcast} from "react-icons/fa";
import {MdOutlineProductionQuantityLimits, MdInvertColors} from "react-icons/md";
import {TbRosetteDiscountCheckFilled} from "react-icons/tb";
//react-toastify package
import {ToastContainer, toast} from "react-toastify";
//styles
import 'react-toastify/dist/ReactToastify.css';


export default function AddNewProduct({getAllProducts}) {
    //react-toastify package variables
    const successNotification = () => toast.success(".محصول اضافه شد");
    const errorNotification = () => toast.error("!اوه، با خطا مواجه شدیم");

    //state
    const [newProductTitle, setNewProductTitle] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductCount, setNewProductCount] = useState("");
    const [newProductImage, setNewProductImage] = useState("");
    const [newProductPopularity, setNewProductPopularity] = useState("");
    const [newProductSale, setNewProductSale] = useState("");
    const [newProductColors, setNewProductColors] = useState("");

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

        const newProductInfos = {
            title: newProductTitle,
            price: newProductPrice,
            count: newProductCount,
            img: newProductImage,
            popularity: newProductPopularity,
            sale: newProductSale,
            colors: newProductColors,
        }

        fetch("http://localhost:3000/api/products/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProductInfos)
        })
            .then(res => res.json())
            .then(data => {
                successNotification();
                getAllProducts();
                clearInputValues();
            })
            .catch(err => {
                clearInputValues();
                errorNotification();
                console.log(err);
            })

    }


    //JSX
    return (
        <div className="mt-[60px]">
            <h2 className="text-[2rem]">افزودن محصول جدید</h2>

            <form className="flex flex-col items-end bg-[var(--white)] p-5 mt-[30px] rounded-[20px]"
                  onSubmit={e => e.preventDefault()}>
                <div
                    className="grid grid-cols-2 gap-y-[10px] gap-x-[15px] w-full [&>div]:flex [&>div]:items-center [&>div]:gap-y-[10px] [&>div]:w-full [&>div]:bg-[#f4f4f4] [&>div]:px-5 [&>div]:rounded-[10px]">
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
                        <input type="text" placeholder="آدرس عکس محصول را بنویسید"
                               value={newProductImage}
                               onChange={e => setNewProductImage(e.target.value)}
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
                    className="text-[1.1rem] text-[var(--white)] bg-[var(--blue)] py-[10px] px-5 mt-[10px] rounded-[10px]"
                    onClick={addNewProduct}>
                    ثبت محصول
                </button>
            </form>

            {/* Notification Modal */}
            <div className="text-right">
                <ToastContainer/>
            </div>
        </div>
    );
}