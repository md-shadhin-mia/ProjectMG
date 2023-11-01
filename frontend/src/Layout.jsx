import {Outlet} from "react-router-dom";
import Sidebar from "./sideNavigation.jsx";
import TopNavigation from "./topNavigation.jsx";
import Dashboard from "./Pages/Dashboard.jsx";

function Layout() {
    return (
        <div className="App min-h-screen h-full font-sans text-base font-normal text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
            <Sidebar />
            <Outlet />
        </div>
    )

}


export default  Layout;