import React, {useState} from 'react';

export default function AddNewProduct() {
    //state
    const [inputs, setInputs] = useState([
        {
            id: 1,
            placeholder: "اسم محصول را بنویسید"
        },
        {
            id: 2,
            placeholder: "قیمت محصول را بنویسید"
        },
        {
            id: 3,
            placeholder: "موجودی محصول را بنویسید"
        },
        {
            id: 4,
            placeholder: "آدرس عکس محصول را بنویسید"
        },
        {
            id: 5,
            placeholder: "میزان محبوبیت محصول را بنویسید"
        },
        {
            id: 6,
            placeholder: "میزان فروش محصول را بنویسید"
        },
        {
            id: 7,
            placeholder: "اسامی رنگ بندی محصول را بنویسید"
        },
    ]);


    //JSX
    return (
        <div className="product-main">
            <h2 className="product-title">افزودن محصول جدید</h2>

            <form action="#" className="add-products-form">
                <div className="add-products-form-wrapper">
                    {/* form inputs */}
                    {
                        inputs.map(input => (
                            <div className="add-products-form-group" key={input.id}>
                                <input type="text" placeholder={input.placeholder} className="add-products-input"/>
                            </div>
                        ))
                    }

                </div>
            </form>
        </div>
    );
}