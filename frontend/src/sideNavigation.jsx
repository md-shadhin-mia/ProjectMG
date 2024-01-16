import React from "react";
import { FaProjectDiagram, FaTasks, FaChartBar, FaUser, FaCog } from "react-icons/fa";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import logo from "./assets/Logo.svg"
import HeroIcon from "./heroIcon";
import {TOGGLE_SIDEBAR} from "./action/types";

const Sidebar = () => {
    const {isVisible} = useSelector((state)=>state.sidebar)
    const dipatchSidebar = useDispatch();

    const navItems = [
        { icon: FaProjectDiagram, label: "Projects", to: "/dashboard" },
        { icon: FaChartBar, label: "Reports", to: "/dashboard/reports" },
        { icon: FaTasks, label: "Tasks", to: "/dashboard/tasks" },
        { icon: FaUser, label: "Profile", to: "/dashboard/profile" },
        { icon: FaCog, label: "Admin", to: "/dashboard/admin" },
    ];

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 ${!isVisible ? "sr-only" : ""} any-transition w-64 bg-white border-r border-gray-100 flex flex-col`}
        >
            <div onClick={() => dipatchSidebar({type: TOGGLE_SIDEBAR, payload: false})} className="backdrop-blur fixed inset-0 bg-black/20 md:hidden block z-[-1]">
            </div>

            <div className="flex items-center justify-between px-5 h-16 border-b border-gray-50">
                <Link to="/" className="flex items-center gap-2.5">
                    <img src={logo} alt="logo" className="h-8 w-8" />
                    <span className="text-sm font-semibold text-gray-800">ProjectMG</span>
                </Link>
                <div className="md:hidden">
                    <HeroIcon />
                </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <Link key={item.label} to={item.to} className="sidebar-item" onClick={() => { if(window.innerWidth < 768) dipatchSidebar({type: TOGGLE_SIDEBAR, payload: false}) }}>
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="px-3 py-4 border-t border-gray-50">
                <div className="flex items-center gap-3 px-3 py-2 text-xs text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    Online
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;