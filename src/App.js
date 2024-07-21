import React from 'react';
import {useRoutes, useLocation} from "react-router-dom";
import routes from "./routes/routes";
import SideBar from "./Components/SideBar/SideBar";
import Header from "./Components/Header/Header";
import {ToastContainer} from "react-toastify";
//styles
import 'react-toastify/dist/ReactToastify.css';

function App() {
    //Router
    const router = useRoutes(routes);

    //Location
    const location = useLocation();

    //JSX
    return (
        <div className="flex size-full">
            {
                location.pathname !== "/login" && (
                    <SideBar/>
                )
            }

            {/* Notification Modal */}
            <ToastContainer/>

            <main className={`flex-[4] size-full p-5 ${location.pathname !== "/login" && "pr-[280px]"}`}>
                {
                    location.pathname !== "/login" && (
                        <Header/>
                    )
                }

                {/* Router */}
                {router}
            </main>
        </div>
    );
}

export default App;
