import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaCircle, FaTrash, FaPlus, FaProjectDiagram } from 'react-icons/fa';
import fetcher from '../fetcher';
import Loading from '../UtilsComponent/Loading';
import TaskForm from './Componets/TaskForm';

const GoalDetail = () => {
  const { projectId, goalId } = useParams();

  const [goal, setGoal] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const loadData = useCallback(() => {
    if (!projectId || !goalId) return;
    Promise.all([
      fetcher.getGoal(projectId, goalId),
      fetcher.getGoalTasks(projectId, goalId)
    ])
      .then(([goalRes, tasksRes]) => {
        setGoal(goalRes.data);
        setTasks(tasksRes.data);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [projectId, goalId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddTask = (data) => {
    if (!data) return;
    fetcher.addTaskToGoal(projectId, goalId, data)
      .then(() => {
        setShowTaskForm(false);
        loadData();
      })
      .catch(() => {});
  };

  const handleComplete = (taskId) => {
    fetcher.completeTask(projectId, goalId, taskId)
      .then(() => loadData())
      .catch(() => {});
  };

  const handleDelete = (taskId) => {
    fetcher.deleteTask(projectId, goalId, taskId)
      .then(() => loadData())
      .catch(() => {});
  };

  if (loading) return <Loading className="flex justify-center py-20 text-indigo-500" />;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!goal) return null;

  const completedCount = tasks.filter(t => t.completed).length;
  const pct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <Link to={`/dashboard/projects/${projectId}`} className="inline-flex items-center gap-2 text-sm text-indigo-500 hover:text-indigo-600 any-transition">
        <FaArrowLeft /> Back to Project
      </Link>

      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FaProjectDiagram className="text-gray-300" size={14} />
              <Link to={`/dashboard/projects/${projectId}`} className="text-xs text-indigo-400 hover:text-indigo-500">
                Project #{projectId}
              </Link>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{goal.title}</h2>
            {goal.description && <p className="text-gray-400 mt-1">{goal.description}</p>}
            {goal.deadline && (
              <p className="text-sm text-gray-400 mt-2">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="badge-soft-indigo">{completedCount}/{tasks.length} tasks</span>
          <span className="badge-soft-green">{pct}% complete</span>
        </div>

        {tasks.length > 0 && (
          <div className="w-full h-2 bg-gray-100 rounded-full mt-4">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 any-transition" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
          <button onClick={() => setShowTaskForm(true)} className="inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600 any-transition">
            <FaPlus /> Add Task
          </button>
        </div>

        {showTaskForm && (
          <div className="mb-4 p-4 border border-gray-100 rounded-xl">
            <TaskForm
              initialValues={{}}
              onSubmit={handleAddTask}
            />
            <button onClick={() => setShowTaskForm(false)} className="text-sm text-gray-400 mt-2 hover:text-gray-600">Cancel</button>
          </div>
        )}

        <div className="space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 any-transition group">
              <button onClick={() => !task.completed && handleComplete(task.id)} className="shrink-0">
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
              </div>
              {task.completed && task.completedAt && (
                <span className="text-xs text-green-400 hidden sm:inline">Done {new Date(task.completedAt).toLocaleDateString()}</span>
              )}
              <button onClick={() => handleDelete(task.id)} className="opacity-0 group-hover:opacity-100 any-transition text-gray-300 hover:text-red-400">
                <FaTrash size={14} />
              </button>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-gray-400 py-8">No tasks yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalDetail;
