import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetcher from '../../fetcher';

const ProjectDetails = function() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetcher.getProjects().then(res => setProjects(res.data)).catch(() => {});
    }, []);

    if (projects.length === 0) return null;

    const project = projects[0];

    return (
        <Link to={`/dashboard/projects/${project.id}/report`} className="card block hover:shadow-md any-transition">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                </div>
                <button className="p-1 rounded-lg hover:bg-gray-50 any-transition text-gray-300 hover:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                    </svg>
                </button>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {project.description || "No description provided."}
            </p>

            <div className="flex items-center gap-3 mb-5">
                <span className="badge-soft-green">Active</span>
                {project.deadline && <span className="badge-soft-red">Due: {new Date(project.deadline).toLocaleDateString()}</span>}
            </div>

            <div className="flex items-center mb-5">
                <div className="flex -space-x-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 ring-2 ring-white" />
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 ring-2 ring-white" />
                </div>
                <span className="ml-3 text-xs text-gray-400 font-medium">View Report →</span>
            </div>
        </Link>
    )
}

export default ProjectDetails;