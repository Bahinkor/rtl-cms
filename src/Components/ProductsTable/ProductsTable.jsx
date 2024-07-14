import React, {useState, useEffect} from 'react';
import {AiOutlineDollarCircle} from 'react-icons/ai';
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";

export default function ProductsTable() {
    //state (products & items)
    const [allProducts, setAllProducts] = useState([]);
    const [editModalItems, setEditModalItems] = useState([
        {
            id: 1,
            placeholder: "عنوان جدید را وارد کنید",
            icon: <AiOutlineDollarCircle/>
        },
        {
            id: 1,
            placeholder: "عنوان جدید را وارد کنید",
            icon: <AiOutlineDollarCircle/>
        },
        {
            id: 1,
            placeholder: "عنوان جدید را وارد کنید",
            icon: <AiOutlineDollarCircle/>
        },
        {
            id: 1,
            placeholder: "عنوان جدید را وارد کنید",
            icon: <AiOutlineDollarCircle/>
        },
    ]);

    //state
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
    const [isShowEditModal, setIsShowEditModal] = useState(false);

    //useEffect
    useEffect(() => {
        async function fetchAllProducts() {
            await fetch("http://localhost:3000/api/products/")
                .then(res => res.json())
                .then(data => setAllProducts(data))
                .catch(err => console.log(err));
        }

        // call function
        fetchAllProducts();
    }, [])

    //functions
    const deleteModalCancelAction = () => {
        setIsShowDeleteModal(false);
    };

    const deleteModalSubmitAction = () => {
        setIsShowDeleteModal(false);
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


    //JSX
    return (
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
                                <button onClick={() => setIsShowDetailsModal(true)}>جزئیات</button>
                                <button onClick={() => setIsShowDeleteModal(true)}>حذف</button>
                                <button onClick={() => setIsShowEditModal(true)}>ویرایش</button>
                            </td>
                        </tr>
                    ))
                }

                </tbody>
            </table>

            {/* Delete modal component */}
            {
                isShowDeleteModal &&
                <DeleteModal cancelAction={deleteModalCancelAction} submitAction={deleteModalSubmitAction}/>
            }

            {/* Details modal component */}
            {
                isShowDetailsModal && <DetailsModal onClose={detailsModalClose}/>
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
                                    <input type="text" placeholder={item.placeholder}
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