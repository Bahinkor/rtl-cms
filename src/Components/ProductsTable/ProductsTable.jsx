import React, {useState, useEffect} from 'react';
import {FaImage, FaFire, FaSellcast} from "react-icons/fa";
import {MdOutlineProductionQuantityLimits, MdInvertColors} from "react-icons/md";
import {TbRosetteDiscountCheckFilled} from "react-icons/tb";
import {AiOutlineDollarCircle} from 'react-icons/ai';
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import ErrorBox from "../ErrorBox/ErrorBox";
//react-toastify package
import {ToastContainer, toast} from 'react-toastify';
//styles
import 'react-toastify/dist/ReactToastify.css';

export default function ProductsTable() {
    //react-toastify package variables
    const successDeleteNotification = () => toast.success(".محصول مورد نظر حذف شد");
    const successPutNotification = () => toast.success(".محصول مورد نظر ویرایش شد");
    const errorNotification = () => toast.error("!اوه، با خطا مواجه شدیم");

    //state (PUT - New product titles)
    const [productNewTitle, setProductNewTitle] = useState("");
    const [productNewPrice, setProductNewPrice] = useState("");
    const [productNewCount, setProductNewCount] = useState("");
    const [productNewImage, setProductNewImage] = useState("");
    const [productNewPopularity, setProductNewPopularity] = useState("");
    const [productNewSale, setProductNewSale] = useState("");
    const [productNewColors, setProductNewColors] = useState("");

    //state (products & edit modal items)
    const [allProducts, setAllProducts] = useState([]);
    const [editModalItems, setEditModalItems] = useState([
        {
            id: 1,
            placeholder: "عنوان جدید را وارد کنید",
            icon: <MdOutlineProductionQuantityLimits/>,
            value: productNewTitle
        },
        {
            id: 2,
            placeholder: "قیمت جدید را وارد کنید",
            icon: <AiOutlineDollarCircle/>,
            value: productNewPrice
        },
        {
            id: 3,
            placeholder: "موجودی جدید را وارد کنید",
            icon: <TbRosetteDiscountCheckFilled/>,
            value: productNewCount
        },
        {
            id: 4,
            placeholder: "کاور جدید را وارد کنید",
            icon: <FaImage/>,
            value: productNewImage
        },
        {
            id: 5,
            placeholder: "محبوبیت جدید را وارد کنید",
            icon: <FaFire/>,
            value: productNewPopularity
        },
        {
            id: 6,
            placeholder: "میزان فروش را وارد کنید",
            icon: <FaSellcast/>,
            value: productNewSale
        },
        {
            id: 7,
            placeholder: "اسامی رنگ بندی را وارد کنید",
            icon: <MdInvertColors/>,
            value: productNewColors
        },
    ]);

    //state
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [mainProductId, setMainProductId] = useState(null);
    const [mainProductInfos, setMainProductInfos] = useState({});

    // Get all products (API)
    const getAllProducts = async () => {
        await fetch("http://localhost:3000/api/products/")
            .then(res => res.json())
            .then(data => setAllProducts(data))
            .catch(err => console.log(err));
    }

    //useEffect
    useEffect(() => {
        // call function
        getAllProducts();
    }, [])

    //functions
    const deleteModalCancelAction = () => {
        setIsShowDeleteModal(false);
    };

    const deleteModalSubmitAction = () => {
        fetch(`http://localhost:3000/api/products/${mainProductId}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                deleteModalCancelAction();
                successDeleteNotification();
                getAllProducts();
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
        setIsShowEditModal(false);
    }

    const editModalClose = (e) => {
        e.preventDefault();
        setIsShowEditModal(false);
    }

    // Update edit modal items
    const updateEditModalItems = product => {
        setEditModalItems([
            {
                id: 1,
                placeholder: "عنوان جدید را وارد کنید",
                icon: <MdOutlineProductionQuantityLimits/>,
                value: product.title
            },
            {
                id: 2,
                placeholder: "قیمت جدید را وارد کنید",
                icon: <AiOutlineDollarCircle/>,
                value: product.price
            },
            {
                id: 3,
                placeholder: "موجودی جدید را وارد کنید",
                icon: <TbRosetteDiscountCheckFilled/>,
                value: product.count
            },
            {
                id: 4,
                placeholder: "کاور جدید را وارد کنید",
                icon: <FaImage/>,
                value: product.img
            },
            {
                id: 5,
                placeholder: "محبوبیت جدید را وارد کنید",
                icon: <FaFire/>,
                value: product.popularity
            },
            {
                id: 6,
                placeholder: "میزان فروش را وارد کنید",
                icon: <FaSellcast/>,
                value: product.sale
            },
            {
                id: 7,
                placeholder: "اسامی رنگ بندی را وارد کنید",
                icon: <MdInvertColors/>,
                value: product.colors
            }
        ])
    }


    //JSX
    return (
        <>

            {
                allProducts.length ? (
                    <>
                        <table className="w-full bg-[var(--white)] mt-[30px] rounded-[10px]">
                            {/* table header */}
                            <thead>
                            <tr className="flex justify-between text-center pr-[70px] pl-[460px]">
                                <th>عکس</th>
                                <th>اسم</th>
                                <th>قیمت</th>
                                <th>موجودی</th>
                            </tr>
                            </thead>

                            {/* products list */}
                            <tbody>

                            {
                                allProducts.map(product => (
                                    <tr key={product.id}
                                        className="flex justify-between text-center pr-[10px] pl-[30px] [&>td]:flex [&>td]:items-center [&>td]:p-5">
                                        <td>
                                            <img src={product.img} alt="product image"
                                                 className="w-[150px] rounded-[10px] object-cover"/>
                                        </td>
                                        <td>{product.title}</td>
                                        <td>{product.price.toLocaleString()} تومان</td>
                                        <td>{product.count}</td>
                                        <td className="[&>button]:text-[var(--white)] [&>button]:text-[1.1rem] [&>button]:bg-[var(--blue)] [&>button]:py-2 [&>button]:px-5 [&>button]:mr-5 [&>button]:rounded-[10px]">
                                            <button onClick={() => {
                                                setIsShowDetailsModal(true)
                                                setMainProductInfos(product);
                                            }}>جزئیات
                                            </button>
                                            <button onClick={() => {
                                                setIsShowDeleteModal(true)
                                                setMainProductId(product.id)
                                            }}>حذف
                                            </button>
                                            <button onClick={() => {
                                                setIsShowEditModal(true)
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

                        {/* Notification Modal */}
                        <div className="text-right">
                            <ToastContainer/>
                        </div>
                    </>
                ) : (
                    <ErrorBox message="هیچ محصولی یافت نشد."/>
                )
            }


            {/* Delete modal component */}
            {
                isShowDeleteModal &&
                <DeleteModal cancelAction={deleteModalCancelAction} submitAction={deleteModalSubmitAction}/>
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
                            <td>{mainProductInfos.popularity}</td>
                            <td>{mainProductInfos.sale.toLocaleString()} تومان</td>
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
                        onSubmit={editModalSubmitAction}
                        onClose={editModalClose}
                    >
                        {
                            editModalItems.map(item => (
                                <div
                                    className="flex items-center gap-y-[10px] w-full bg-[#f4f4f4] px-5 mt-[15px] rounded-[10px]"
                                    key={item.id}>
                                    <span>
                                        {item.icon}
                                    </span>
                                    <input type="text" placeholder={item.placeholder} value={item.value}
                                           className="w-full bg-transparent text-[1.1rem] py-[8px] px-[10px] outline-none"/>
                                </div>
                            ))
                        }
                    </EditModal>
                )
            }

        </>
    );
}