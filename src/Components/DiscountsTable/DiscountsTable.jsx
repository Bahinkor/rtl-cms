import React, {useState, useEffect, useContext} from 'react';
import Loading from '../Loading/Loading';
import ErrorBox from '../ErrorBox/ErrorBox';
import {KeyContext} from "../../context-api/GetKeyValueContext";


export default function DiscountsTable() {
    //state
    const [allDiscounts, setAllDiscounts] = useState(null);

    //context
    const keyValue = useContext(KeyContext)[0];

    //function
    const getAllDiscounts = async () => {
        await fetch("http://localhost:8000/discounts/", {
            headers: {
                "Authorization": `Token ${keyValue !== null && keyValue}`,
            }
        })
            .then(res => res.json())
            .then(data => setAllDiscounts(data))
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
                            <th>سازنده</th>
                            <th>تایتل</th>
                            <th>وضعیت</th>
                            <th>درصد تخفیف</th>
                            <th>کد تخفیف</th>
                            <th>اکشن</th>
                        </tr>
                        </thead>

                        {/* Users list */}
                        <tbody>

                        {
                            allDiscounts.map(discount => (
                                <tr key={discount.discount_code}
                                    className="flex items-center w-full text-center [&>*]:w-full [&>*]:p-5">
                                    <td>{discount.author.username}</td>
                                    <td>{discount.title}</td>
                                    <td>{discount.is_active ? "فعال" : "غیرفعال"}</td>
                                    <td>{discount.percent}%</td>
                                    <td>{discount.key}</td>
                                    <td className="[&>button]:btn !p-[5px]">
                                        {
                                            discount.is_active ? (
                                                <button className="bg-orange-500"
                                                        onClick={() => {

                                                        }}>غیر فعالسازی</button>
                                            ) : (
                                                <button className="green-btn" onClick={() => {

                                                }}>فعالسازی
                                                </button>
                                            )
                                        }
                                        <button className="red-btn">حذف</button>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>
                ) : (
                    <ErrorBox message="هیچ تخفیفی یافت نشد."/>
                )
            }
        </>
    );
}