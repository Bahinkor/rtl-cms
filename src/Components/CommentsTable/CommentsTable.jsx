import React, {useState, useEffect} from 'react';
import {toast} from "react-toastify";
import Loading from "../Loading/Loading";
import ErrorBox from "../ErrorBox/ErrorBox";
import DetailsModal from "../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";

export default function CommentsTable() {
    //state
    const [allComments, setAllComments] = useState(null);
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [mainCommentBody, setMainCommentBody] = useState("");

    //react-toastify package function
    const errorNotification = () => toast.error("اوه، با خطا مواجه شدیم!", {
        rtl: true,
        pauseOnHover: false,
        autoClose: 3000,
    });

    //function
    const getAllComments = () => {

        fetch("http://localhost:3000/api/comments/")
            .then(res => res.json())
            .then(data => setAllComments(data))
            .catch(err => {
                errorNotification();
                console.log(err);
            })

    }

    const closeDetailsModal = () => setIsShowDetailsModal(false);
    const closeDeleteModal = () => setIsShowDeleteModal(false);

    const deleteModalSubmitAction = () => {
        setIsShowDeleteModal(false);
    }

    //useEffect
    useEffect(() => {
        getAllComments();
    }, [])

    //JSX
    return (
        <>

            {
                allComments === null ? (
                    <Loading/>
                ) : allComments.length ? (

                    <table className="w-full bg-[var(--white)] mt-[30px] rounded-[10px]">
                        {/* table header */}
                        <thead>
                        <tr className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">
                            <th>اسم کاربر</th>
                            <th>محصول</th>
                            <th>کامنت</th>
                            <th>تاریخ</th>
                            <th>ساعت</th>
                            <th>اکشن</th>
                        </tr>
                        </thead>

                        {/* products list */}
                        <tbody>

                        {
                            allComments.map(comment => (
                                <tr
                                    className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5"
                                    key={comment.id}>
                                    <td>{comment.userID}</td>
                                    <td>{comment.productID}</td>
                                    <td className="[&>button]:bg-[var(--blue)] [&>button]:text-[var(--white)] [&>button]:px-[8px] [&>button]:py-[5px] [&>button]:rounded-[10px]">
                                        <button onClick={() => {
                                            setMainCommentBody(comment.body);
                                            setIsShowDetailsModal(true)
                                        }}>نمایش
                                        </button>
                                    </td>
                                    <td>{comment.date}</td>
                                    <td>{comment.hour}</td>
                                    <td className="[&>button]:btn">
                                        <button className="red-btn" onClick={() => setIsShowDeleteModal(true)}>حذف
                                        </button>
                                        <button className="blue-btn">پاسخ</button>
                                        <button className="green-btn">تایید</button>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>

                ) : (
                    <ErrorBox message="هیچ کامنتی یافت نشد."/>
                )

            }

            {/* Details Modal */}
            {
                isShowDetailsModal && (
                    <DetailsModal onClose={closeDetailsModal}>
                        <p className="w-[400px] bg-[var(--white)] p-5">{mainCommentBody}</p>
                    </DetailsModal>
                )
            }

            {/* Delete Modal */}
            {
                isShowDeleteModal &&
                <DeleteModal cancelAction={closeDeleteModal} submitAction={deleteModalSubmitAction}/>
            }

        </>
    );
}
