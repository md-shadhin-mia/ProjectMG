import React from 'react';

const TaskForm = ({ initialValues, onSubmit }) => {
    const [title, setTitle] = React.useState(initialValues.title || '');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ id: initialValues.id, title });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="border border-gray-400 p-2 w-full"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
                Update
            </button>
            <button
                type="button"
                onClick={() => onSubmit(null)}
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded ml-2"
            >
                Cancel
            </button>
        </form>
    );
};

export default TaskForm;
