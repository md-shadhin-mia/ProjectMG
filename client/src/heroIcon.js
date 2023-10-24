import React, { useState } from "react";

const HeroIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex justify-end z-50">
      <button
        className="focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className={`w-6 h-6 transition duration-150 ease-in-out `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16"
            className={(isOpen?"scale-x-75 ":"")+"transition-all origin-right"}
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 12h16"
            className={(isOpen?"scale-x-50 ":"")+"transition-all origin-right"}
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 18h16"
          />

        </svg>
      </button>
    </div>
  );
};

export default HeroIcon;
