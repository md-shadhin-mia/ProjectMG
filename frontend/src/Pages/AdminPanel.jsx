import React, { useState, useEffect } from 'react';
import { FaUsers, FaProjectDiagram, FaBullseye, FaTasks, FaShieldAlt } from 'react-icons/fa';
import fetcher from '../fetcher';
import Loading from '../UtilsComponent/Loading';

const AdminPanel = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetcher.getAdminPanel()
      .then(res => { setData(res.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <Loading className="flex justify-center py-20 text-indigo-500" />;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!data) return null;

  const statCards = [
    { icon: FaUsers, label: "Users", value: data.users ?? data.totalUsers ?? "—", color: "text-blue-400" },
    { icon: FaProjectDiagram, label: "Projects", value: data.projects ?? data.totalProjects ?? "—", color: "text-indigo-400" },
    { icon: FaBullseye, label: "Goals", value: data.goals ?? data.totalGoals ?? "—", color: "text-green-400" },
    { icon: FaTasks, label: "Tasks", value: data.tasks ?? data.totalTasks ?? "—", color: "text-purple-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FaShieldAlt className="text-indigo-400" size={24} />
        <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div key={i} className="card text-center">
            <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {data.users && Array.isArray(data.users) && data.users.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Profession</th>
                  <th className="pb-3 font-medium">Location</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 any-transition">
                    <td className="py-3 text-gray-700">{user.id}</td>
                    <td className="py-3 text-gray-700">{user.email || "—"}</td>
                    <td className="py-3 text-gray-700">{user.profession || "—"}</td>
                    <td className="py-3 text-gray-700">{user.location || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!data.users && (
        <div className="card">
          <pre className="text-sm text-gray-600 overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
