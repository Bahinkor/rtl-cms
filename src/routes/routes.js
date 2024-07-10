import Home from "../Components/Home/Home";
import Products from "../Components/Products/Products";
import Comments from "../Components/Comments/Comments";
import Users from "../Components/Users/Users";
import Orders from "../Components/Orders/Orders";
import Offs from "../Components/Offs/Offs";

export const routes = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/products",
        element: <Products/>
    },
    {
        path: "/comments",
        element: <Comments/>
    },
    {
        path: "/users",
        element: <Users/>
    },
    {
        path: "/orders",
        element: <Orders/>
    },
    {
        path: "/offs",
        element: <Offs/>
    },
];