import React, { useState, useEffect, useCallback } from 'react';
import GoalForm from "./Componets/GoalsForm.jsx";
import Goal from "./Componets/Goals.jsx";
import TaskForm from "./Componets/TaskForm.jsx";
import fetcher from '../fetcher';

const GoalsAndTasks = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [goals, setGoals] = useState([]);
    const [showGoalForm, setShowGoalForm] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);
    const [addingTaskForGoal, setAddingTaskForGoal] = useState(null);

    useEffect(() => {
        fetcher.getProjects().then(res => {
            setProjects(res.data);
            if (res.data.length > 0 && !selectedProjectId) {
                setSelectedProjectId(String(res.data[0].id));
            }
        }).catch(() => {});
    }, []);

    useEffect(() => {
        if (!selectedProjectId) return;
        fetcher.getProjectGoals(selectedProjectId)
            .then(res => setGoals(res.data))
            .catch(() => setGoals([]));
    }, [selectedProjectId]);

    const refreshGoals = useCallback(() => {
        if (!selectedProjectId) return;
        fetcher.getProjectGoals(selectedProjectId).then(res => setGoals(res.data)).catch(() => {});
    }, [selectedProjectId]);

    const handleAddGoal = (goalData) => {
        fetcher.addGoalToProject(selectedProjectId, goalData).then(() => {
            refreshGoals();
            setShowGoalForm(false);
        }).catch(() => {});
    };

    const handleUpdateGoal = (updatedGoal) => {
        fetcher.updateGoal(selectedProjectId, updatedGoal.id, updatedGoal).then(() => {
            refreshGoals();
            setEditingGoal(null);
            setShowGoalForm(false);
        }).catch(() => {});
    };

    const handleDeleteGoal = (goalId) => {
        fetcher.deleteGoal(selectedProjectId, goalId).then(() => refreshGoals()).catch(() => {});
    };

    const handleAddTask = (goalId, taskData) => {
        fetcher.addTaskToGoal(selectedProjectId, goalId, taskData).then(() => {
            refreshGoals();
            setAddingTaskForGoal(null);
        }).catch(() => {});
    };

    const handleCompleteTask = (goalId, taskId) => {
        fetcher.completeTask(selectedProjectId, goalId, taskId).then(() => refreshGoals()).catch(() => {});
    };

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Goals and Tasks</h2>
                <div className="flex items-center gap-3">
                    <select
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400"
                    >
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => { setEditingGoal(null); setShowGoalForm(true); }}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600 any-transition"
                    >
                        Add Goal
                    </button>
                </div>
            </div>

            {showGoalForm && (
                <div className="mb-6 p-4 border border-gray-100 rounded-xl">
                    <GoalForm
                        onSubmit={editingGoal ? handleUpdateGoal : handleAddGoal}
                        initialValues={editingGoal || {}}
                    />
                    <button onClick={() => { setShowGoalForm(false); setEditingGoal(null); }} className="text-sm text-gray-400 mt-2 hover:text-gray-600">Cancel</button>
                </div>
            )}

            <div className="space-y-4">
                {goals.map(goal => (
                    <div key={goal.id} className="p-4 rounded-xl bg-gray-50">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">{goal.title}</h3>
                                {goal.description && <p className="text-sm text-gray-400">{goal.description}</p>}
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                    {goal.deadline && <span>Deadline: {goal.deadline}</span>}
                                    <span>{goal.tasks ? goal.tasks.filter(t => t.completed).length : 0}/{goal.tasks ? goal.tasks.length : 0} tasks done</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <button onClick={() => { setEditingGoal(goal); setShowGoalForm(true); }} className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 any-transition">Edit</button>
                                <button onClick={() => handleDeleteGoal(goal.id)} className="text-xs px-3 py-1.5 bg-red-50 text-red-500 border border-red-100 rounded-lg hover:bg-red-100 any-transition">Delete</button>
                                <button onClick={() => setAddingTaskForGoal(goal.id)} className="text-xs px-3 py-1.5 bg-indigo-50 text-indigo-500 border border-indigo-100 rounded-lg hover:bg-indigo-100 any-transition">+ Task</button>
                            </div>
                        </div>

                        {addingTaskForGoal === goal.id && (
                            <div className="mt-3">
                                <TaskForm
                                    initialValues={{}}
                                    onSubmit={(data) => data ? handleAddTask(goal.id, data) : setAddingTaskForGoal(null)}
                                />
                            </div>
                        )}

                        {goal.tasks && goal.tasks.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {goal.tasks.map(task => (
                                    <div key={task.id} className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg">
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => !task.completed && handleCompleteTask(goal.id, task.id)}
                                            className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-400"
                                        />
                                        <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-300' : 'text-gray-700'}`}>{task.title}</span>
                                        {task.completed && task.completedAt && (
                                            <span className="text-xs text-green-400">Done {new Date(task.completedAt).toLocaleDateString()}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {goals.length === 0 && selectedProjectId && (
                    <p className="text-center text-gray-400 py-8">No goals yet. Click "Add Goal" to get started.</p>
                )}
            </div>
        </div>
    );
};

export default GoalsAndTasks;