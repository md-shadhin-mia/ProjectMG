import React from "react";
import {FaMoon, FaSun} from "react-icons/all.js";
import {useDispatch, useSelector} from "react-redux";
import setTheme from "../action/setTheme.jsx";

const DarkModeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.theme)
    return (
        <button
            onClick={() => dispatch(setTheme(theme !== "dark" ? "dark" : "light"))}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
                theme === "dark" ? "bg-indigo-400" : "bg-gray-200"
            }`}
        >
            <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 flex items-center justify-center ${
                    theme === "dark" ? "translate-x-4" : ""
                }`}
            >
                {theme === "dark"
                    ? <FaMoon size={8} className="text-indigo-400" />
                    : <FaSun size={8} className="text-amber-400" />
                }
            </span>
        </button>
    );
};

export default DarkModeToggle;