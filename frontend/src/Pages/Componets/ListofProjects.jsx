import React, { useState, useEffect } from 'react';
import fetcher from '../../fetcher';

const ProjectList = () => {
    const [report, setReport] = useState(null);

    useEffect(() => {
        fetcher.getReportSummary().then(res => setReport(res.data)).catch(() => {});
    }, []);

    const barColors = ["bg-indigo-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-pink-400"];

    return (
        <div className="card">
            <div className="mb-6">
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Projects Overview</h4>
            </div>

            <div className="space-y-1">
                {report ? report.projects.map((p, i) => (
                    <div key={p.id}
                        className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-50 any-transition group">
                        <span className="text-xs font-mono text-gray-300 w-5">{i + 1}</span>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <div>
                                    <span className="text-sm font-medium text-gray-700">{p.title}</span>
                                    <span className="text-xs text-gray-400 ml-2">{p.goalCount} goals</span>
                                </div>
                                <span className="text-xs text-gray-400">{p.completedTasks}/{p.taskCount}</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full">
                                <div
                                    className={`h-full rounded-full ${barColors[i % barColors.length]} any-transition`}
                                    style={{width: `${p.taskCount > 0 ? (p.completedTasks / p.taskCount) * 100 : 0}%`}}
                                />
                            </div>
                        </div>
                    </div>
                )) : <div className="text-center text-gray-400 text-sm py-4">Loading...</div>}
            </div>
        </div>
    );
};

export default ProjectList;