import React from 'react';
import SideBar from "./Components/SideBar/SideBar";
import Header from "./Components/Header/Header";

function App() {
    return (
        <div className="App">
            <SideBar/>

            <main className="flex-[4] p-5 pr-[280px]">
                <Header/>

                {/* Router */}
            </main>
        </div>
    );
}

export default App;
