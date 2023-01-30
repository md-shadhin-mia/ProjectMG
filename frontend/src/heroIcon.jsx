import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {TOGGLE_SIDEBAR} from "./action/types";

const HeroIcon = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state)=>state.sidebar);
  return (
    <div className="relative flex justify-end">
      <button
        className="focus:outline-none"
        onClick={() => dispatch({type:TOGGLE_SIDEBAR, payload:!sidebar.isVisible})}
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
            className={(sidebar.isVisible?"scale-x-75 ":"")+"transition-all origin-right"}
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 12h16"
            className={(sidebar.isVisible?"scale-x-50 ":"")+"transition-all origin-right"}
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
