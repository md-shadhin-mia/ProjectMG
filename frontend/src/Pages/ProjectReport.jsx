import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaClock, FaFlag, FaTasks, FaBullseye } from 'react-icons/fa';
import fetcher from '../fetcher';
import Loading from '../UtilsComponent/Loading';

const ProjectReport = () => {
  const { projectId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetcher.getProjectReport(projectId)
      .then(res => { setReport(res.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [projectId]);

  if (loading) return <Loading className="flex justify-center py-20" />;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!report) return null;

  return (
    <div className="space-y-6">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-indigo-500 hover:text-indigo-600 any-transition">
        <FaArrowLeft /> Back to Dashboard
      </Link>

      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{report.title}</h2>
            <p className="text-gray-400 mt-1">{report.description}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
              <span>Created: {new Date(report.createdAt).toLocaleDateString()}</span>
              {report.deadline && <span>Deadline: {new Date(report.deadline).toLocaleDateString()}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card text-center">
          <FaBullseye className="mx-auto text-indigo-400 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-900">{report.totalGoals}</div>
          <div className="text-xs text-gray-400">Goals</div>
        </div>
        <div className="card text-center">
          <FaTasks className="mx-auto text-blue-400 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-900">{report.totalTasks}</div>
          <div className="text-xs text-gray-400">Total Tasks</div>
        </div>
        <div className="card text-center">
          <FaCheckCircle className="mx-auto text-green-400 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-900">{report.completedTasks}</div>
          <div className="text-xs text-gray-400">Completed</div>
        </div>
        <div className="card text-center">
          <FaClock className="mx-auto text-yellow-400 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-900">{report.pendingTasks}</div>
          <div className="text-xs text-gray-400">Pending</div>
        </div>
        <div className="card text-center">
          <FaFlag className="mx-auto text-purple-400 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-900">{report.completionRate}%</div>
          <div className="text-xs text-gray-400">Completion</div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals Breakdown</h3>
        <div className="space-y-4">
          {report.goals.map((goal) => {
            const pct = goal.totalTasks > 0 ? Math.round((goal.completedTasks / goal.totalTasks) * 100) : 0;
            return (
              <div key={goal.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{goal.title}</h4>
                    {goal.description && <p className="text-sm text-gray-400">{goal.description}</p>}
                  </div>
                  <div className="text-right text-sm">
                    <span className="font-semibold text-gray-700">{goal.completedTasks}/{goal.totalTasks}</span>
                    <span className="text-gray-400 ml-1">tasks</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 any-transition" style={{ width: `${pct}%` }} />
                </div>
                {goal.deadline && <p className="text-xs text-gray-400 mt-1">Deadline: {goal.deadline}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectReport;
