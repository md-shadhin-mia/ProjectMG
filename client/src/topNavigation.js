import React from 'react';
import { FaBell, FaEnvelope, FaCalendar } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go'

const TopNavigation = () => {
  return (
    <header className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0  bg-white dark:bg-gray-800 shadow-sm">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2 text-black dark:text-white">
        <div className="pl-4">
          <a className="text-lg font-medium text-gray-900 dark:text-slate-300 " href="#">
            <img src="logo.svg" alt="logo" className="h-8" />
          </a>
        </div>
        <div className="block lg:hidden pr-4">
          <button id="nav-toggle" className="flex items-center p-1 text-orange-800 hover:text-gray-900 dark:text-slate-400">
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden  mt-2 lg:mt-0 bg-white lg:bg-transparent text-black dark:text-white p-4 lg:p-0 z-20" id="nav-content">
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <a className="inline-block py-2 px-4 text-black dark:text-white font-medium" href="#">Avatar</a>
            </li>
            <li className="mr-3">
              <a className="inline-block py-2 px-4 text-black dark:text-white font-medium" href="#">
                <FaBell size={20} className="text-gray-600" />
              </a>
            </li>
            <li className="mr-3">
              <a className="inline-block py-2 px-4 text-black dark:text-white font-medium" href="#">
                <FaEnvelope size={20} className="text-gray-600" />
              </a>
            </li>
            <li className="mr-3">
              <a className="inline-block py-2 px-4 text-black dark:text-white font-medium" href="#">
                <FaCalendar size={20} className="text-gray-600" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default TopNavigation;
