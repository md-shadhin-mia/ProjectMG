import React, {useState, useEffect, useRef} from 'react';

const IconWithDropdown = ({ icon, children }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current.contains(event.target)) {
                return;
            }
            setIsDropdownOpen(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="font-medium text-gray-600 hover:text-gray-900 focus:outline-none focus:shadow-outline relative inline-block"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {icon}
            </button>

                <ul className={"origin-top-right absolute ltr:right-0 rtl:left-0 rounded top-full z-50 py-0.5 ltr:text-left rtl:text-right bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md min-w-[12rem] transition-all duration-200 ease-out" + (!isDropdownOpen?" hidden":"")}>
                    {children}
                </ul>

        </div>
    );
};

export default IconWithDropdown;
