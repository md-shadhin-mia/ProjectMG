import {Outlet} from "react-router-dom";
import Sidebar from "./sideNavigation.jsx";
import TopNavigation from "./topNavigation.jsx";
import {useSelector} from "react-redux";

function Layout() {
    const isVisible = useSelector((state)=>state.sidebar.isVisible);
    return (
        <div className="min-h-screen bg-gray-50 text-gray-400 antialiased">
            <Sidebar />
            <div className={`any-transition ${isVisible ? "md:pl-16 lg:pl-64" : ""}`}>
                <TopNavigation />
                <main className="max-w-7xl mx-auto px-6 py-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout;