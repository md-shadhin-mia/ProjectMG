import React, { useState } from "react";
import {FaMoon, FaSun} from "react-icons/all.js";
import {useDispatch, useSelector} from "react-redux";
import setTheme from "../action/setTheme.jsx";

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.theme)
    return (
        <label className="relative inline-block w-12 h-7 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer">
            <input
                type="checkbox"
                className="absolute opacity-0 w-0 h-0"
                checked={theme == "dark"}
                onChange={(even) => {
                    dispatch(setTheme(theme !== "dark"? "dark":"light"));
                }}
            />
            <span className="relative block">
                <span
                    className={` absolute w-5 h-5 rounded-full m-1 transition-all duration-200 bg-gray-800  left-5 dark:left-0 `}
                ></span>
                <FaMoon
                    className={`absolute top-0 left-0 ml-1.5 mt-1.5 dark:text-white text-black `}
                />
                <FaSun
                    className={`absolute top-0 right-0 mr-1.5 mt-1.5 dark:text-black text-white`}
                />
      </span>
        </label>
    );
};

export default DarkModeToggle;
