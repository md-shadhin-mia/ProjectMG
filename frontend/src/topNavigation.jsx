import React from 'react';
import { FaBell, FaEnvelope, FaCalendar } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go'
import AvatarAndMenu from "./UtilsComponent/avatarAndMenu";
import HeroIcon from "./heroIcon";

const TopNavigation = () => {
  return (
    <header className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 lg:mx-0  bg-white dark:bg-gray-800 shadow-sm">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2 text-black dark:text-white">
        <div className="pl-4">
          <HeroIcon/>
        </div>
        <div className="w-full flex-grow flex items-center w-auto  mt-0 bg-white bg-transparent text-black dark:text-white p-4 lg:p-0 z-20" id="nav-content">
          <ul className="list-reset flex justify-end flex-1 items-center">
            <li className="mr-3">
              <a className="inline-block py-2 px-4 text-black dark:text-white font-medium" href="#">Avatar</a>
            </li>
            <li className="mr-3">
              <div className="relative inline-block">
                <FaBell size={20} className="text-gray-600" />
                <span
                    className="flex justify-center absolute -top-2 -right-1 text-center bg-red-500 px-1 text-white rounded-full text-xs text-"><span
                    className="align-self-center">3</span></span>
              </div>
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
            <li className="mr-3">
              <AvatarAndMenu />
            </li>

          </ul>
        </div>
      </div>
    </header>
  );
}

export default TopNavigation;
