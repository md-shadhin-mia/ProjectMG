import React, { useState } from 'react';

const GoalForm = ({ onSubmit, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title || '');
    const [description, setDescription] = useState(initialValues.description || '');
    const [deadline, setDeadline] = useState(initialValues.deadline || '');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ title, description, deadline });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    className="border border-gray-400 p-2 w-full"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="border border-gray-400 p-2 w-full"
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="deadline">
                    Deadline
                </label>
                <input
                    className="border border-gray-400 p-2 w-full"
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={(event) => setDeadline(event.target.value)}
                />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                Update
            </button>
        </form>
    );
};

export default GoalForm;
