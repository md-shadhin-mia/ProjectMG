import React, { useState } from "react";
import { FaBars, FaProjectDiagram, FaTasks, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { connect } from "react-redux";

const Sidebar = ({isVisible, toggleSidebar}) => {
    return (
        <aside 
            className={`hidden md:block fixed left-0 top-0 bottom-0 h-screen md:w-16 lg:w-48 z-10 overflow-y-auto bg-slate-900 text-white`}
        >
            <nav className="px-2 md:px-2 lg:px-4 py-6">
                <a href="#" className="font-medium text-lg mb-2 flex items-center hover:bg-slate-700 p-2">
                    <FaProjectDiagram size={20} className="align-middle mr-2" />
                    <span className="md:sr-only lg:not-sr-only">
                    Projects
                    </span>
                </a>
                <a href="#" className="font-medium text-lg mb-2 flex items-center hover:bg-slate-700 p-2">
                    <FaTasks size={20} className="align-middle mr-2" />
                    <span className="md:sr-only lg:not-sr-only">
                    Tasks
                    </span>
                </a>
                <a href="#" className="font-medium text-lg mb-2 flex items-center hover:bg-slate-700 p-2">
                    <FaCalendarAlt size={20} className="align-middle mr-2" />
                    <span className="md:sr-only lg:not-sr-only">
                    Calendar
                    </span>
                </a>
                <a href="#" className="font-medium text-lg mb-2 flex items-center hover:bg-slate-700 p-2">
                    <FaUsers size={20} className="align-middle mr-2" />
                    <span className="md:sr-only lg:not-sr-only">
                    Members
                    </span>
                </a>
            </nav>
        </aside>

    );
};

const mapStateToProps = (state) => {
    return {
      isVisible: state.isVisible
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      toggleSidebar: () => dispatch({type:"TOGGLE_SIDEBAR"})
    };
  };

export default connect(mapStateToProps, mapDispatchToProps) (Sidebar);
