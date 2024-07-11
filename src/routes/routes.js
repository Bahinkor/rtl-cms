import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import Comments from "../pages/Comments/Comments";
import Users from "../pages/Users/Users";
import Orders from "../pages/Orders/Orders";
import Offs from "../pages/Offs/Offs";

const routes = [
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

export default routes;