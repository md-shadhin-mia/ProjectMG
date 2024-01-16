import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaBullseye, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import fetcher from '../fetcher';
import Loading from '../UtilsComponent/Loading';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState({ title: "", description: "", deadline: "" });
  const [submitting, setSubmitting] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    Promise.all([
      fetcher.getProject(projectId),
      fetcher.getProjectGoals(projectId)
    ])
      .then(([projRes, goalsRes]) => {
        setProject(projRes.data);
        setGoals(goalsRes.data);
        setFields({
          title: projRes.data.title || "",
          description: projRes.data.description || "",
          deadline: projRes.data.deadline ? projRes.data.deadline.split("T")[0] : ""
        });
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [projectId]);

  const changeHandle = (e) => {
    setFields({...fields, [e.target.name]: e.target.value});
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setSubmitting(true);
    fetcher.updateProject(projectId, fields)
      .then(res => {
        setProject(res.data);
        setEditing(false);
        setSubmitting(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || "Failed to update");
        setSubmitting(false);
      });
  };

  const handleDelete = () => {
    fetcher.deleteProject(projectId)
      .then(() => navigate("/dashboard"))
      .catch(err => setError(err.response?.data?.error || "Failed to delete"));
  };

  if (loading) return <Loading className="flex justify-center py-20 text-indigo-500" />;
  if (error && !project) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!project) return null;

  return (
    <div className="space-y-6">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-indigo-500 hover:text-indigo-600 any-transition">
        <FaArrowLeft /> Back to Dashboard
      </Link>

      <div className="card">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {editing ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" name="title" value={fields.title} onChange={changeHandle} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea name="description" value={fields.description} onChange={changeHandle} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  <input type="date" name="deadline" value={fields.deadline} onChange={changeHandle} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400" />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div className="flex gap-3">
                  <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600 any-transition disabled:opacity-50">
                    <FaSave /> {submitting ? "Saving..." : "Save"}
                  </button>
                  <button type="button" onClick={() => setEditing(false)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 any-transition">
                    <FaTimes /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
                <p className="text-gray-400 mt-1">{project.description || "No description."}</p>
                {project.deadline && (
                  <p className="text-sm text-gray-400 mt-2">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                )}
              </>
            )}
          </div>
          {!editing && (
            <div className="flex items-center gap-2 ml-4 shrink-0">
              <button onClick={() => setEditing(true)} className="p-2 rounded-lg hover:bg-gray-100 any-transition text-gray-400 hover:text-indigo-500">
                <FaEdit size={18} />
              </button>
              <button onClick={() => setShowDeleteConfirm(true)} className="p-2 rounded-lg hover:bg-gray-100 any-transition text-gray-400 hover:text-red-500">
                <FaTrash size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="badge-soft-green">Active</span>
          <Link to={`/dashboard/projects/${projectId}/report`} className="badge-soft-indigo">View Report</Link>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="card border-red-100 bg-red-50">
          <p className="text-sm text-red-600 mb-4">Are you sure you want to delete this project? This action cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 any-transition">Delete</button>
            <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 rounded-lg text-sm text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 any-transition">Cancel</button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Goals ({goals.length})</h3>
        </div>

        <div className="space-y-3">
          {goals.map(goal => (
            <Link key={goal.id} to={`/dashboard/projects/${projectId}/goals/${goal.id}`} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-gray-50 hover:bg-indigo-50 any-transition group">
              <FaBullseye className="text-indigo-400 shrink-0" size={18} />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                {goal.description && <p className="text-xs text-gray-400 truncate">{goal.description}</p>}
              </div>
              <div className="text-xs text-gray-400">
                {goal.tasks ? goal.tasks.filter(t => t.completed).length : 0}/{goal.tasks ? goal.tasks.length : 0} tasks
              </div>
            </Link>
          ))}
          {goals.length === 0 && (
            <p className="text-center text-gray-400 py-4">No goals yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
