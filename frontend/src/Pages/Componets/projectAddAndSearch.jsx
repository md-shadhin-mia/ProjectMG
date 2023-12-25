import {FaPlus, FaSearch} from "react-icons/all.js";
import {Link} from "react-router-dom";

const ProjectAddAndSearch = () => {
    return (
        <div className="card">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <Link to="/dashboard/create"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-500 bg-indigo-50 hover:bg-indigo-100 rounded-xl any-transition">
                    <FaPlus size={14} />
                    Add new project
                </Link>

                <div className="relative flex items-center w-full sm:w-64">
                    <FaSearch className="absolute left-3 w-4 h-4 text-gray-300 pointer-events-none" />
                    <input
                        type="text"
                        className="block w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-gray-50 border border-gray-100 placeholder-gray-300 focus:outline-none focus:border-gray-200 focus:bg-white any-transition"
                        placeholder="Search project"
                    />
                </div>
            </div>
        </div>
    );
}

export default ProjectAddAndSearch;