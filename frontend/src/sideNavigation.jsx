import React from "react";
import {  FaProjectDiagram, FaTasks, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector} from "react-redux";
import logo from "./assets/logo.svg"
import HeroIcon from "./heroIcon";
import {TOGGLE_SIDEBAR} from "./action/types";
const Sidebar = () => {
    const {isVisible} = useSelector((state)=>state.sidebar)
    const dipatchSidebar = useDispatch();
    return (
        <aside 
            className={`fixed ${!isVisible? "sr-only":""} any-transition h-screen bg-white dark:bg-gray-800 shadow-sm compact-sidebar z-50`}
        >
            <div onClick={()=>dipatchSidebar({type:TOGGLE_SIDEBAR, payload:false})} className="backdrop-blur absolute left-full top-0 bottom-0 bg-black opacity-75 md:hidden block" style={{right: "calc(-100vw + 100%)"}}>
            </div>
            <nav className="px-2 md:px-2 lg:px-4 py-6 h-full overflow-y-auto scrollbars">
                <div className="text-center mx-4 block md:hidden text-white">
                    <HeroIcon />
                </div>
                <div className="mh-18 text-center py-5">
                    <a href="/" className="relative flex flex-col justify-center">
                        <img src={logo} alt="logo for site" className="max-h-20 m-2"/>
                        <h2 className="text-2xl font-semibold text-gray-200 px-4 max-h-9 overflow-hidden compact-item any-transition">
                            <span className="text-gray-700 dark:text-gray-200 ">Taildash</span>
                        </h2>
                    </a>
                </div>
                <a href="#" className="font-medium text-lg mb-2 flex items-center hover:bg-slate-700 p-2">
                    <FaProjectDiagram size={20} className="align-middle mr-2" />
                    <span className="compact-item any-transition">
                    Projects
                    </span>
                </a>
                <a href="#" className="font-medium text-lg mb-2 flex items-center hover:bg-slate-700 p-2">
                    <FaTasks size={20} className="align-middle mr-2" />
                    <span className="compact-item any-transition">
                    Tasks
                    </span>
                </a>
                <a href="#" className="font-medium text-lg mb-2 flex items-center hover:bg-slate-700 p-2">
                    <FaCalendarAlt size={20} className="align-middle mr-2" />
                    <span className="compact-item any-transition">
                    Calendar
                    </span>
                </a>
                <a href="#" className="font-medium text-lg mb-2 flex items-center hover:bg-slate-700 p-2">
                    <FaUsers size={20} className="align-middle mr-2" />
                    <span className="compact-item any-transition">
                    Members
                    </span>
                </a>
                {/*[1,2,3,4,5].map((v)=>(<a href="#" key={v} className="font-medium text-lg mb-2 flex items-center hover:bg-slate-700 p-2">
                    <FaUsers size={20} className="align-middle mr-2"/>
                    <span className="compact-item any-transition">
                    Members
                    </span>
                </a>))*/}
            </nav>
        </aside>

    );
};



export default Sidebar;
