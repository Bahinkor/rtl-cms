import React from 'react';
import {useRoutes, useLocation, Navigate} from "react-router-dom";
import routes from "./routes/routes";
import SideBar from "./Components/SideBar/SideBar";
import Header from "./Components/Header/Header";
import {GetKeyValueContext} from "./context-api/GetKeyValueContext";
import {IsShowMobileMenuContext} from "./context-api/IsShowMobileMenuContext";
import {ToastContainer} from "react-toastify";
//styles
import 'react-toastify/dist/ReactToastify.css';

function App() {
    //Router
    const router = useRoutes(routes);

    //Local Storage
    const keyValue = localStorage.getItem("key");

    //Location
    const location = useLocation();

    //JSX
    return (
        <GetKeyValueContext>
            <IsShowMobileMenuContext>
                <>

                    {
                        keyValue === null && <Navigate to="/login"/>
                    }

                    <div className="flex size-full">
                        {
                            location.pathname !== "/login" && (
                                <SideBar/>
                            )
                        }

                        {/* Notification Modal */}
                        <ToastContainer className="!w-[312px] md:w-[412px]"/>

                        <main
                            className={`md:flex-[4] size-full p-5 ${location.pathname !== "/login" && "md:pr-[280px]"}`}>
                            {
                                location.pathname !== "/login" && (
                                    <Header/>
                                )
                            }

                            {/* Router */}
                            {router}
                        </main>
                    </div>

                </>
            </IsShowMobileMenuContext>
        </GetKeyValueContext>
    );
}

export default App;
