import React, {useState, useEffect, useRef} from 'react';

const IconWithDropdown = ({ icon, children }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                if(dropdownRef.current && !dropdownRef.current.contains(event.target))
                    setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        if (dropdownRef.current) {
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const buttonRect = buttonRef.current.getBoundingClientRect();
            dropdownRef.current.style.right = 0;
            dropdownRef.current.style.left = "auto";
            if ( window.innerWidth - dropdownRect.width > buttonRect.left) {
                dropdownRef.current.style.left = 0;
                dropdownRef.current.style.right = "auto";
            }
        }
    }, [buttonRef, dropdownRef, isDropdownOpen]);
    return (
        <div className="relative">
            <button
                ref={buttonRef}
                className="font-medium text-gray-600 hover:text-gray-900 focus:outline-none focus:shadow-outline relative inline-block"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {icon}
            </button>
            {isDropdownOpen &&
                <ul
                    ref={dropdownRef}
                    className={"origin-top-right absolute rounded top-full z-50 py-0.5 ltr:text-left rtl:text-right bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md min-w-[12rem] transition-all duration-200 ease-out"}>
                    {children}
                </ul>
            }

        </div>
    );
};

export default IconWithDropdown;
