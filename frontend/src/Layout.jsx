import {Outlet} from "react-router-dom";
import Sidebar from "./sideNavigation.jsx";
import TopNavigation from "./topNavigation.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import {useSelector} from "react-redux";

function Layout() {
    const isVisible = useSelector((state)=>state.sidebar.isVisible);
    return (
        <div className="App min-h-screen font-sans text-base font-normal text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
            <Sidebar />
            <div className={`any-transition ${isVisible? "md:pl-16 lg:pl-64":""}`}>
                <TopNavigation />
                <div className="main container p-4 mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )

}


export default  Layout;