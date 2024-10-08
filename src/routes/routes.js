import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import Comments from "../pages/Comments/Comments";
import Users from "../pages/Users/Users";
import Orders from "../pages/Orders/Orders";
import Discounts from "../pages/Discounts/Discounts";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";

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
        path: "/discounts",
        element: <Discounts/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "*",
        element: <NotFound/>
    },
];

export default routes;