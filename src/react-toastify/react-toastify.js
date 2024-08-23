import {toast} from "react-toastify";

const successNotification = () => toast.success("عملیات موفقیت آمیز بود.", {
    rtl: true,
    pauseOnHover: false,
    autoClose: 3000,
});

const errorNotification = () => toast.error("اوه، با خطا مواجه شدیم!", {
    rtl: true,
    pauseOnHover: false,
    autoClose: 3000,
});

const successDeleteNotification = () => toast.success("محصول مورد نظر حذف شد.", {
    rtl: true,
    pauseOnHover: false,
    autoClose: 3000,
});

const successPutNotification = () => toast.success("محصول مورد نظر ویرایش شد.", {
    rtl: true,
    pauseOnHover: false,
    autoClose: 3000,
});

const internetError = () => toast.error("از متصل بودن اینترنت خود اطمینان حاصل کنید.", {
    rtl: true,
    pauseOnHover: false,
    autoClose: 3000,
});

export {
    successNotification,
    errorNotification,
    successDeleteNotification,
    successPutNotification,
    internetError
};