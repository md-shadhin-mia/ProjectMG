import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaProjectDiagram, FaBullseye, FaTasks, FaFlag, FaArrowRight } from 'react-icons/fa';
import fetcher from '../fetcher';
import Loading from '../UtilsComponent/Loading';

const Reports = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetcher.getReportSummary()
      .then(res => { setSummary(res.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <Loading className="flex justify-center py-20 text-indigo-500" />;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!summary) return null;

  const barColors = ["bg-indigo-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-pink-400", "bg-purple-400"];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Reports Overview</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card text-center">
          <FaProjectDiagram className="mx-auto text-indigo-400 mb-2" size={24} />
          <div className="text-3xl font-bold text-gray-900">{summary.totalProjects}</div>
          <div className="text-xs text-gray-400 mt-1">Total Projects</div>
        </div>
        <div className="card text-center">
          <FaBullseye className="mx-auto text-blue-400 mb-2" size={24} />
          <div className="text-3xl font-bold text-gray-900">{summary.totalGoals}</div>
          <div className="text-xs text-gray-400 mt-1">Total Goals</div>
        </div>
        <div className="card text-center">
          <FaTasks className="mx-auto text-green-400 mb-2" size={24} />
          <div className="text-3xl font-bold text-gray-900">{summary.totalTasks}</div>
          <div className="text-xs text-gray-400 mt-1">Total Tasks</div>
        </div>
        <div className="card text-center">
          <FaFlag className="mx-auto text-purple-400 mb-2" size={24} />
          <div className="text-3xl font-bold text-indigo-500">{summary.completionRate}%</div>
          <div className="text-xs text-gray-400 mt-1">Completion Rate</div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects</h3>
        <div className="space-y-1">
          {summary.projects.map((p, i) => {
            const pct = p.taskCount > 0 ? Math.round((p.completedTasks / p.taskCount) * 100) : 0;
            return (
              <Link key={p.id} to={`/dashboard/projects/${p.id}/report`} className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-50 any-transition group">
                <span className="text-xs font-mono text-gray-300 w-5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="text-sm font-medium text-gray-700">{p.title}</span>
                      <span className="text-xs text-gray-400 ml-2">{p.goalCount} goals</span>
                    </div>
                    <span className="text-xs text-gray-400">{p.completedTasks}/{p.taskCount} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full">
                    <div className={`h-full rounded-full ${barColors[i % barColors.length]} any-transition`} style={{width: `${pct}%`}} />
                  </div>
                </div>
                <FaArrowRight className="text-gray-300 group-hover:text-indigo-400 any-transition shrink-0" size={14} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reports;
