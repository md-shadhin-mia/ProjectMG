import React from 'react';
import {NavLink} from "react-router-dom";

function AuthFooter(props) {
    return (
            <footer className="bg-white p-6 border-t border-gray-200 dark:bg-gray-800 dark:border-gray-800">
                <div className="mx-auto px-4">
                    <div className="flex flex-wrap flex-row -mx-4">
                        <div
                            className="flex-shrink max-w-full px-4 w-full md:w-1/2 text-center md:ltr:text-left md:rtl:text-right">
                            <ul className="ltr:pl-0 rtl:pr-0">
                                <li className="inline-block ltr:mr-3 rtl:ml-3">
                                    <a className="hover:text-indigo-500" href="#">Support</a>
                                </li>
                                <li className="inline-block ltr:mr-3 rtl:ml-3">
                                    <a className="hover:text-indigo-500" href="#">Help Center</a>
                                </li>
                                <li className="inline-block ltr:mr-3 rtl:ml-3">
                                    <a className="hover:text-indigo-500" href="#">Privacy</a>
                                </li>
                                <li className="inline-block ltr:mr-3 rtl:ml-3">
                                    <a className="hover:text-indigo-500" href="#">Terms of Service</a>
                                </li>
                            </ul>
                        </div>
                        <div
                            className="flex-shrink max-w-full px-4 w-full md:w-1/2 text-center md:ltr:text-right md:rtl:text-left">
                            <p className="mb-0 mt-3 md:mt-0">
                                <NavLink to="/" className="hover:text-indigo-500">Tailnet</NavLink> | All right
                                reserved
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
    );
}

export default AuthFooter;