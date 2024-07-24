import React, {useState, useEffect} from 'react';
import Loading from "../Loading/Loading";
import ErrorBox from "../ErrorBox/ErrorBox";
import DetailsModal from "../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import {successNotification, errorNotification} from "../../react-toastify/react-toastify";

export default function CommentsTable() {
    //state
    const [allComments, setAllComments] = useState(null);
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
    const [isShowRejectModal, setIsShowRejectModal] = useState(false);
    const [mainCommentBody, setMainCommentBody] = useState("");
    const [mainCommentID, setMainCommentID] = useState(null);

    //function
    const getAllComments = () => {

        fetch("http://localhost:8000/comments/", {
            headers: {
                "Authorization": "Token 502387428aee0698042273c57145ed5aea88cadb",
            }
        })
            .then(res => res.json())
            .then(data => setAllComments(data))
            .catch(err => {
                errorNotification();
                console.log(err);
            })

    }

    const closeDetailsModal = () => setIsShowDetailsModal(false);
    const closeDeleteModal = () => setIsShowDeleteModal(false);
    const closeAcceptModal = () => setIsShowAcceptModal(false);
    const closeRejectModal = () => setIsShowRejectModal(false);

    const deleteModalSubmitAction = () => {

        fetch(`http://localhost:8000/comments/delete/${mainCommentID}/`, {
            method: "DELETE",
            headers: {
                "Authorization": "Token 502387428aee0698042273c57145ed5aea88cadb",
            }
        })
            .then(res => {
                if (res.ok) {
                    successNotification();
                    getAllComments();
                } else {
                    errorNotification();
                    console.log(res)
                }
            })
            .catch(err => {
                errorNotification();
                console.log(err)
            })

        closeDeleteModal();
    }

    const acceptModalSubmitAction = () => {

        // fetch(`http://localhost:3000/api/comments/accept/${mainCommentID}`, {
        //     method: "POST",
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         successNotification();
        //         getAllComments();
        //     })
        //     .catch(err => {
        //         errorNotification();
        //         console.log(err)
        //     })

        closeAcceptModal();
    }

    const rejectModalSubmitAction = () => {

        // fetch(`http://localhost:3000/api/comments/reject/${mainCommentID}`, {
        //     method: "POST"
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         successNotification();
        //         getAllComments();
        //     })
        //     .catch(err => {
        //         errorNotification();
        //         console.log(err)
        //     })

        closeRejectModal();
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

                    <table
                        className="w-full bg-[var(--white)] dark:bg-slate-800 dark:text-slate-200 mt-[30px] rounded-[10px]">
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

                        {/* Comments list */}
                        <tbody>

                        {
                            allComments.map(comment => (
                                <tr
                                    className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5"
                                    key={comment.comment_code}>
                                    <td>{comment.user.username}</td>
                                    <td>{comment.productID}</td>
                                    <td className="[&>button]:bg-[var(--blue)] [&>button]:text-[var(--white)] [&>button]:px-[8px] [&>button]:py-[5px] [&>button]:rounded-[10px]">
                                        <button onClick={() => {
                                            setMainCommentBody(comment.content);
                                            setIsShowDetailsModal(true)
                                        }}>نمایش
                                        </button>
                                    </td>
                                    <td>{comment.date}</td>
                                    <td>{comment.hour}</td>
                                    <td className="[&>button]:btn !p-[10px]">
                                        <button className="blue-btn">پاسخ</button>
                                        <button className="red-btn" onClick={() => {
                                            setMainCommentID(comment.comment_code);
                                            setIsShowDeleteModal(true)
                                        }}>حذف
                                        </button>

                                        {
                                            comment.isAccept === 0 ? (
                                                <button className="green-btn" onClick={() => {
                                                    setMainCommentID(comment.id);
                                                    setIsShowAcceptModal(true)
                                                }}>تایید
                                                </button>
                                            ) : (
                                                <button className="bg-orange-500"
                                                        onClick={() => {
                                                            setMainCommentID(comment.id);
                                                            setIsShowRejectModal(true)
                                                        }}>لغو تایید</button>
                                            )
                                        }

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
                        <p className="w-[400px] bg-[var(--white)] dark:bg-slate-700 dark:text-slate-200 p-5">{mainCommentBody}</p>
                    </DetailsModal>
                )
            }

            {/* Delete Modal */}
            {
                isShowDeleteModal &&
                <DeleteModal cancelAction={closeDeleteModal} submitAction={deleteModalSubmitAction}
                             title="آیا از حذف اطمینان دارید؟"/>
            }

            {/* Accept Modal */}
            {
                isShowAcceptModal && <DeleteModal cancelAction={closeAcceptModal} submitAction={acceptModalSubmitAction}
                                                  title="آیا از تایید اطمینان دارید؟"/>
            }

            {/* Reject Modal */}
            {
                isShowRejectModal && <DeleteModal cancelAction={closeRejectModal} submitAction={rejectModalSubmitAction}
                                                  title="آیا از لغو تایید اطمینان دارید؟"/>
            }

        </>
    );
}
