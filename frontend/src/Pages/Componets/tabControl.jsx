import React, { useState } from 'react';

const TabControl = ({ handleTabChange, tab }) => {
  return (
    <div className="flex">
      <button
        className={`px-2 py-1 rounded-md m-2 ${tab === 1 ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-700 dark:bg-gray-600  dark:text-white'}`}
        onClick={() => handleTabChange(1)}
      >
        All
      </button>
      <button
        className={`px-2 py-1 rounded-md m-2 ${tab === 2 ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-700 dark:bg-gray-600  dark:text-white'}`}
        onClick={() => handleTabChange(2)}
      >
        Completed
      </button>
      <button
        className={`px-2 py-1 rounded-md m-2 ${tab === 3 ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-700 dark:bg-gray-600  dark:text-white'}`}
        onClick={() => handleTabChange(3)}
      >
        Not Completed
      </button>
    </div>
  );
};

export default TabControl;