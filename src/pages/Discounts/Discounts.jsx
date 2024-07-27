import React, {useState, useContext} from 'react';
import DiscountsTable from "../../Components/DiscountsTable/DiscountsTable";
import AddNewDiscount from "../../Components/AddNewDiscount/AddNewDiscount";
import {KeyContext} from "../../context-api/GetKeyValueContext";

export default function Discounts() {
    //stste
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

    //JSX
    return (
        <div>
            <AddNewDiscount getAllDiscounts={getAllDiscounts}/>
            <DiscountsTable getAllDiscounts={getAllDiscounts} allDiscounts={allDiscounts}
                            setAllDiscounts={setAllDiscounts}/>
        </div>
    );
}