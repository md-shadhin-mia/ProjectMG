import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaCircle, FaTrash, FaProjectDiagram, FaBullseye } from 'react-icons/fa';
import fetcher from '../fetcher';
import Loading from '../UtilsComponent/Loading';
import TabControl from './Componets/tabControl';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(1);

  const loadTasks = useCallback(() => {
    setLoading(true);
    fetcher.getProjects()
      .then(res => {
        const projects = res.data;
        const promises = projects.map(p =>
          fetcher.getProjectGoals(p.id).then(goalsRes => ({ project: p, goals: goalsRes.data }))
        );
        return Promise.all(promises);
      })
      .then(projectGoals => {
        const allTasks = [];
        projectGoals.forEach(({ project, goals }) => {
          goals.forEach(goal => {
            (goal.tasks || []).forEach(task => {
              allTasks.push({
                ...task,
                projectId: project.id,
                projectTitle: project.title,
                goalId: goal.id,
                goalTitle: goal.title
              });
            });
          });
        });
        setTasks(allTasks);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleComplete = (task) => {
    fetcher.completeTask(task.projectId, task.goalId, task.id)
      .then(() => loadTasks())
      .catch(() => {});
  };

  const handleDelete = (task) => {
    fetcher.deleteTask(task.projectId, task.goalId, task.id)
      .then(() => loadTasks())
      .catch(() => {});
  };

  const filtered = tasks.filter(t => {
    if (filter === 2) return t.completed;
    if (filter === 3) return !t.completed;
    return true;
  });

  if (loading) return <Loading className="flex justify-center py-20 text-indigo-500" />;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">All Tasks</h2>
        <TabControl tab={filter} handleTabChange={setFilter} />
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No tasks found.</p>
        ) : (
          <div className="space-y-2">
            {filtered.map(task => (
              <div key={task.id} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 any-transition group">
                <button onClick={() => !task.completed && handleComplete(task)} className="shrink-0">
                  {task.completed ? (
                    <FaCheckCircle className="text-green-400" size={18} />
                  ) : (
                    <FaCircle className="text-gray-300 hover:text-indigo-400 any-transition" size={18} />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm ${task.completed ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                    {task.title}
                  </span>
                  <div className="flex items-center gap-3 mt-0.5">
                    <Link to={`/dashboard/projects/${task.projectId}`} className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-500">
                      <FaProjectDiagram size={10} />
                      {task.projectTitle}
                    </Link>
                    <Link to={`/dashboard/projects/${task.projectId}/goals/${task.goalId}`} className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-500">
                      <FaBullseye size={10} />
                      {task.goalTitle}
                    </Link>
                  </div>
                </div>
                {task.completed && task.completedAt && (
                  <span className="text-xs text-green-400 hidden sm:inline">Done {new Date(task.completedAt).toLocaleDateString()}</span>
                )}
                <button onClick={() => handleDelete(task)} className="opacity-0 group-hover:opacity-100 any-transition text-gray-300 hover:text-red-400">
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
