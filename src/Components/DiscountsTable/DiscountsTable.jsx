import React, {useState, useEffect} from 'react';
import Loading from '../Loading/Loading';
import ErrorBox from '../ErrorBox/ErrorBox';

export default function DiscountsTable() {
    //state
    const [allDiscounts, setAllDiscounts] = useState(null);

    //function
    const getAllDiscounts = async () => {
        await fetch("http://localhost:8000/discounts/", {
            headers: {
                "Authorization": "Token 502387428aee0698042273c57145ed5aea88cadb",
            }
        })
            .then(res => res.json())
            .catch(data => setAllDiscounts(data))
            .catch(err => console.log(err));
    }

    //useEffect
    useEffect(() => {
        getAllDiscounts();
    }, [])

    //JSX
    return (
        <>
            {
                allDiscounts === null ? (
                    <Loading/>
                ) : allDiscounts.length ? (
                    < table
                        className="w-full bg-[var(--white)] dark:bg-slate-800 dark:text-slate-200 mt-[30px] rounded-[10px]">
                        {/* table header */}
                        <thead>
                        <tr className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">
                            <th>نام و نام خانوادگی</th>
                            <th>یوزرنیم</th>
                            <th>شهر</th>
                            <th>شماره تماس</th>
                            <th>ایمیل</th>
                            <th>اکشن</th>
                        </tr>
                        </thead>

                        {/* Users list */}
                        <tbody>

                        {/*{*/}
                        {/*    allDiscounts.map(discount => (*/}
                        {/*        <tr key={discount.discount_code}*/}
                        {/*            className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">*/}
                        {/*            <td>{user.first_name} {user.last_name}</td>*/}
                        {/*            <td>{user.username}</td>*/}
                        {/*            <td>{user.city}</td>*/}
                        {/*            <td>{user.phone}</td>*/}
                        {/*            <td>{user.email}</td>*/}
                        {/*            <td className="[&>button]:btn !p-[5px]">*/}
                        {/*                <button className="blue-btn" onClick={() => {*/}
                        {/*                    setIsShowDetailsModal(true);*/}
                        {/*                    setMainUserDetailInfos(user);*/}
                        {/*                }}>جزئیات*/}
                        {/*                </button>*/}
                        {/*                <button className="red-btn" onClick={() => {*/}
                        {/*                    setMainUserID(user.user_code);*/}
                        {/*                    setIsShowDeleteModal(true);*/}
                        {/*                }}>حذف*/}
                        {/*                </button>*/}
                        {/*                <button className="green-btn" onClick={() => {*/}
                        {/*                    setMainUserID(user.user_code);*/}
                        {/*                    setIsShowEditModal(true);*/}
                        {/*                    updateEditModalItems(user);*/}
                        {/*                }}>ویرایش*/}
                        {/*                </button>*/}
                        {/*            </td>*/}
                        {/*        </tr>*/}
                        {/*    ))*/}
                        {/*}*/}

                        </tbody>
                    </table>
                ) : (
                    <ErrorBox message="هیچ تخفیفی یافت نشد."/>
                )
            }
        </>
    );
}