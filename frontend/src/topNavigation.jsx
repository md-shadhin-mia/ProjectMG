import React from 'react';
import { FaBell, FaEnvelope, FaStar } from 'react-icons/fa';
import AvatarAndMenu from "./Pages/Componets/avatarAndMenu.jsx";
import HeroIcon from "./heroIcon";

const TopNavigation = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <HeroIcon />
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl hover:bg-gray-100 any-transition text-gray-300 hover:text-gray-500">
              <FaStar size={18} />
            </button>

            <button className="p-2 rounded-xl hover:bg-gray-100 any-transition text-gray-300 hover:text-gray-500 relative">
              <FaBell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full" />
            </button>

            <button className="p-2 rounded-xl hover:bg-gray-100 any-transition text-gray-300 hover:text-gray-500">
              <FaEnvelope size={18} />
            </button>

            <div className="ml-2 pl-2 border-l border-gray-100">
              <AvatarAndMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavigation;