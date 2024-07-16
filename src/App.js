import React from 'react';
import {useRoutes} from "react-router-dom";
import routes from "./routes/routes";
import SideBar from "./Components/SideBar/SideBar";
import Header from "./Components/Header/Header";
import {ToastContainer} from "react-toastify";
//styles
import 'react-toastify/dist/ReactToastify.css';

function App() {
    //Router
    const router = useRoutes(routes);


    //JSX
    return (
        <div className="App flex">
            <SideBar/>

            {/* Notification Modal */}
            <ToastContainer/>

            <main className="flex-[4] p-5 pr-[280px]">
                <Header/>

                {/* Router */}
                {router}
            </main>
        </div>
    );
}

export default App;
