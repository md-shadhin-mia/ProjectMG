import React from 'react';

const Task = ({ task, onDelete, onEdit }) => (
    <div className="flex items-center mb-4">
        <input
            type="checkbox"
            checked={task.completed}
            className="mr-2"
        />
        <p className="flex-1">{task.title}</p>
        <div className="flex">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mr-2"
                onClick={() => onEdit(task.id)}
            >
                Edit
            </button>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                onClick={() => onDelete(task.id)}
            >
                Delete
            </button>
        </div>
    </div>
);

export default Task;
