import React, {useState, useContext} from 'react';
import {FaImage, FaFire, FaSellcast} from "react-icons/fa";
import {MdOutlineProductionQuantityLimits, MdInvertColors} from "react-icons/md";
import {TbRosetteDiscountCheckFilled} from "react-icons/tb";
import {AiOutlineDollarCircle} from 'react-icons/ai';
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import ErrorBox from "../ErrorBox/ErrorBox";
import Loading from "../Loading/Loading";
import {KeyContext} from "../../context-api/GetKeyValueContext";
//react-toastify package
import {
    errorNotification,
    successDeleteNotification,
    successPutNotification
} from "../../react-toastify/react-toastify";

export default function ProductsTable({allProducts, getAllProducts}) {
    //state (PUT - New product titles)
    const [productNewTitle, setProductNewTitle] = useState("");
    const [productNewPrice, setProductNewPrice] = useState("");
    const [productNewCount, setProductNewCount] = useState("");
    const [productNewImage, setProductNewImage] = useState(null);
    const [productNewPopularity, setProductNewPopularity] = useState("");
    const [productNewSale, setProductNewSale] = useState("");
    const [productNewColors, setProductNewColors] = useState("");


    //state
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [mainProductId, setMainProductId] = useState(null);
    const [mainProductInfos, setMainProductInfos] = useState({});

    //context
    const keyValue = useContext(KeyContext)[0];

    //functions
    const deleteModalCancelAction = () => {
        setIsShowDeleteModal(false);
    };

    const deleteModalSubmitAction = () => {
        fetch(`http://localhost:8000/products/delete/${mainProductId}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            }
        })
            .then(res => {
                if (res.ok) {
                    deleteModalCancelAction();
                    successDeleteNotification();
                    getAllProducts();
                } else {
                    deleteModalCancelAction();
                    errorNotification();
                    console.log(res)
                }
            })
            .catch(err => {
                deleteModalCancelAction();
                errorNotification();
                console.log(err)
            });
    };

    const detailsModalClose = () => {
        setIsShowDetailsModal(false);
    }

    const editModalSubmitAction = (e) => {
        e.preventDefault();

        const productNewInfos = new FormData();
        productNewInfos.append("title", productNewTitle);
        productNewInfos.append("price", productNewPrice);
        productNewInfos.append("count", productNewCount);
        productNewInfos.append("image", productNewImage);
        productNewInfos.append("popularity", productNewPopularity);
        productNewInfos.append("sale_amount", productNewSale);
        productNewInfos.append("colors", productNewColors);

        fetch(`http://localhost:8000/products/update/${mainProductId}/`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            },
            body: productNewInfos,
        })
            .then(res => {
                if (res.ok) {
                    successPutNotification();
                    getAllProducts();
                } else {
                    errorNotification();
                    console.log(res);
                }
            })
            .catch(err => {
                errorNotification();
                console.log(err)
            })

        setIsShowEditModal(false);
    }

    const editModalClose = (e) => {
        e.preventDefault();
        setIsShowEditModal(false);
    }

    const updateEditModalItems = product => {
        setProductNewTitle(product.title);
        setProductNewPrice(product.price);
        setProductNewCount(product.count);
        setProductNewImage(product.image);
        setProductNewPopularity(product.popularity);
        setProductNewSale(product.sale_amount);
        setProductNewColors(product.colors);
    }


    //JSX
    return (
        <>

            {
                allProducts === null ? (
                    <Loading/>
                ) : allProducts.length ? (
                    <>
                        <table
                            className="w-full bg-[var(--white)] dark:bg-slate-800 mt-[30px] dark:text-slate-200 rounded-[10px]">
                            {/* table header */}
                            <thead>
                            <tr className="flex items-center w-full text-center py-5 [&>*]:w-full">
                                <th className="hidden xs:inline-block">عکس</th>
                                <th>اسم</th>
                                <th>قیمت</th>
                                <th>موجودی</th>
                                <th>اکشن</th>
                            </tr>
                            </thead>

                            {/* products list */}
                            <tbody>

                            {
                                allProducts.map(product => (
                                    <tr key={product.product_code}
                                        className="flex items-center w-full [&>td]:flex [&>td]:justify-center [&>td]:items-center [&>td]:w-full [&>td]:text-center [&>td]:p-5">
                                        <td className="!hidden xs:!flex">
                                            <img src={product.image} alt="product image"
                                                 className="w-[150px] rounded-[10px] object-cover"/>
                                        </td>
                                        <td>{product.title}</td>
                                        <td>{product.price.toLocaleString()} تومان</td>
                                        <td>{product.count}</td>
                                        <td className="[&>button]:btn flex flex-col lg:flex-row gap-1">
                                            <button className="green-btn" onClick={() => {
                                                setIsShowDetailsModal(true)
                                                setMainProductInfos(product);
                                            }}>جزئیات
                                            </button>
                                            <button className="red-btn" onClick={() => {
                                                setIsShowDeleteModal(true)
                                                setMainProductId(product.product_code)
                                            }}>حذف
                                            </button>
                                            <button className="blue-btn" onClick={() => {
                                                setIsShowEditModal(true);
                                                setMainProductId(product.product_code);
                                                // defaults value
                                                updateEditModalItems(product);
                                            }}>ویرایش
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                            </tbody>
                        </table>
                    </>
                ) : (
                    <ErrorBox message="هیچ محصولی یافت نشد."/>
                )
            }


            {/* Delete modal component */}
            {
                isShowDeleteModal &&
                <DeleteModal cancelAction={deleteModalCancelAction} submitAction={deleteModalSubmitAction}
                             title="آیا از حذف اطمینان دارید؟"/>
            }

            {/* Details modal component */}
            {
                isShowDetailsModal &&
                <DetailsModal onClose={detailsModalClose}>
                    <table className="w-full bg-[var(--white)] mt-5 rounded-[10px]">

                        <thead>
                        <tr className="text-center [&>*]:p-5">
                            <th>محبوبیت</th>
                            <th>فروش</th>
                            <th>رنگ بندی</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr className="text-center [&>*]:p-5">
                            <td>{mainProductInfos.popularity}%</td>
                            <td>{mainProductInfos.sale_amount.toLocaleString()} تومان</td>
                            <td>{mainProductInfos.colors}</td>
                        </tr>
                        </tbody>

                    </table>
                </DetailsModal>
            }

            {/* Edit modal component */}
            {
                isShowEditModal && (
                    <EditModal
                        submitAction={editModalSubmitAction}
                        onClose={editModalClose}
                    >

                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-title-input">عنوان محصول:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <MdOutlineProductionQuantityLimits/>
                            </span>
                                <input type="text" placeholder="عنوان جدید را وارد کنید" value={productNewTitle}
                                       onChange={e => setProductNewTitle(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-title-input"/>
                            </div>

                        </div>
                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-price-input">قیمت محصول:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <AiOutlineDollarCircle/>
                            </span>
                                <input type="text" placeholder="قیمت جدید را وارد کنید" value={productNewPrice}
                                       onChange={e => setProductNewPrice(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-price-input"/>
                            </div>

                        </div>
                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-count-input">موجودی محصول:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <TbRosetteDiscountCheckFilled/>
                            </span>
                                <input type="text" placeholder="موجودی جدید را وارد کنید" value={productNewCount}
                                       onChange={e => setProductNewCount(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-count-input"/>
                            </div>

                        </div>
                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-image-input">کاور محصول: *الزامی</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <FaImage/>
                            </span>
                                <input type="file" onChange={e => setProductNewImage(e.target.files[0])}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-image-input"/>
                            </div>

                        </div>
                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-popularity-input">محبوبیت محصول:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <FaFire/>
                            </span>
                                <input type="text" placeholder="محبوبیت جدید را وارد کنید" value={productNewPopularity}
                                       onChange={e => setProductNewPopularity(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-popularity-input"/>
                            </div>

                        </div>
                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-sale-input">میزان فروش محصول:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <FaSellcast/>
                            </span>
                                <input type="text" placeholder="میزان فروش را وارد کنید" value={productNewSale}
                                       onChange={e => setProductNewSale(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-sale-input"/>
                            </div>

                        </div>
                        {/*  */}
                        <div className="flex flex-col items-start [&>label]:text-[var(--blue)]">

                            <label htmlFor="#edit-colors-input">اسامی رنگ محصول:</label>
                            <div
                                className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-1 rounded-[10px]">

                            <span>
                                <MdInvertColors/>
                            </span>
                                <input type="text" placeholder="اسامی رنگ بندی را وارد کنید" value={productNewColors}
                                       onChange={e => setProductNewColors(e.target.value)}
                                       className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"
                                       id="edit-colors-input"/>
                            </div>

                        </div>

                    </EditModal>
                )
            }

        </>
    );
}