import React, { useState, useEffect } from 'react';
import ProjectList from './Componets/ListofProjects';
import ProjectAddAndSearch from './Componets/projectAddAndSearch';
import ProjectDetails from './Componets/projectDetails';
import ProjectChart from './Componets/projectChart';
import TasksAndGoal from "./TasksAndGoal.jsx";
import fetcher from '../fetcher';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetcher.getReportSummary().then(res => setSummary(res.data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="text-3xl font-bold text-gray-900">{summary.totalProjects}</div>
            <div className="text-xs text-gray-400 mt-1">Total Projects</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gray-900">{summary.totalGoals}</div>
            <div className="text-xs text-gray-400 mt-1">Total Goals</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gray-900">{summary.totalTasks}</div>
            <div className="text-xs text-gray-400 mt-1">Total Tasks</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-indigo-500">{summary.completionRate}%</div>
            <div className="text-xs text-gray-400 mt-1">Completion Rate</div>
          </div>
        </div>
      )}

      <ProjectAddAndSearch />
      <ProjectDetails />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ProjectChart />
        </div>
        <div className="lg:col-span-2">
          <ProjectList />
        </div>
      </div>

      <TasksAndGoal />
    </div>
  );
};

export default Dashboard;