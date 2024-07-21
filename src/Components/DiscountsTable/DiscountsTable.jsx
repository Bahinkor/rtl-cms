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
                                    <td>{discount.is_active ? "فعال" : "غیرفعال"}</td>
                                    <td>{discount.percent}%</td>
                                    <td>{discount.title}</td>
                                    <td className="[&>button]:btn !p-[5px]">
                                        <button className="blue-btn">خالی</button>
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