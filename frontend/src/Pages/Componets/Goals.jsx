import React from "react";
import Task from "./Task";

const Goal = ({ goal, index, handleDeleteGoal, handleEditGoal, tasks }) => {
    return (
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between">
                <h3 className="text-lg font-medium">{goal.title}</h3>
                <div>
                    <button
                        className="px-2 py-1 bg-gray-300 rounded-full text-gray-700 hover:bg-gray-400"
                        onClick={() => handleEditGoal(index)}
                    >
                        Edit
                    </button>
                    <button
                        className="px-2 py-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                        onClick={() => handleDeleteGoal(index)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <p className="text-gray-700">{goal.description}</p>
            <h4 className="text-sm font-medium text-gray-700">Deadline: {goal.deadline}</h4>
            <div className="mt-4">
                {tasks.map((task, taskIndex) => (
                    <Task
                        key={taskIndex}
                        task={task}
                        index={taskIndex}
                        goalIndex={index}
                        // handleDeleteTask={handleDeleteTask}
                        // handleEditTask={handleEditTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default Goal;