import {FaPlus, FaSearch} from "react-icons/all.js";
import {Link, useMatch} from "react-router-dom";

const ProjectAddAndSearch= ()=>{

    return (  
        <div className="py-4 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
            <div className="flex flex-wrap flex-row">
            <div className="flex-shrink max-w-full w-full">
                <div className="md:flex md:justify-between">
                <Link  to="/dashboard/create" className="py-2 px-4 block lg:inline-block text-center rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">Add new project
                    <FaPlus width={12} height={12} fill="currentColor" className="inline-block ltr:ml-1 rtl:mr-1 bi bi-plus-lg" />
                </Link>
                {/* search */}
                <div className="relative flex items-center w-full md:w-60 h-full group mt-4 md:mt-0 md:self-center">
                    <FaSearch className="absolute ltr:left-0 rtl:right-0 w-4 h-4 ltr:ml-4 rtl:mr-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 block" />
                    <input type="text" className="block w-full py-1.5 ltr:pl-10 ltr:pr-4 rtl:pr-10 rtl:pl-4 leading-normal rounded-2xl focus:outline-none bg-gray-100 border border-gray-100 focus:border-gray-200 focus:ring-0 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-700" placeholder="Search project" />
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default ProjectAddAndSearch;