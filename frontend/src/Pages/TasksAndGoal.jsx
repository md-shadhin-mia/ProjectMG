import React, { useState } from 'react';
import GoalForm from "./Componets/GoalsForm.jsx";
import Goal from "./Componets/Goals.jsx";


const goalsExam = [
    {
        id: 1,
        title: 'Write a novel',
        description: 'Write a novel in the next six months',
        deadline: '2024-08-01',
        tasks: [
            {
                id: 1,
                title: 'Outline the story',
                completed: true
            },
            {
                id: 2,
                title: 'Write the first draft',
                completed: false
            },
            {
                id: 3,
                title: 'Edit the draft',
                completed: false
            }
        ]
    },
    {
        id: 2,
        title: 'Lose weight',
        description: 'Lose 10 pounds in the next three months',
        deadline: '2024-05-01',
        tasks: [
            {
                id: 1,
                title: 'Join a gym',
                completed: true
            },
            {
                id: 2,
                title: 'Start working out',
                completed: true
            },
            {
                id: 3,
                title: 'Start eating healthier',
                completed: false
            }
        ]
    }
];

const GoalsAndTasks = () => {
    const [goals, setGoals] = useState(goalsExam);

    const [selectedGoal, setSelectedGoal] = useState(null);
    const [showGoalForm, setShowGoalForm] = useState(false);

    const handleAddGoal = goal => {
        setGoals([...goals, goal]);
        setShowGoalForm(false);
    };

    const handleEditGoal = goal => {
        setSelectedGoal(goal);
        setShowGoalForm(true);
    };

    const handleUpdateGoal = updatedGoal => {
        setGoals(
            goals.map(goal => (goal.id === updatedGoal.id ? updatedGoal : goal))
        );
        setSelectedGoal(null);
        setShowGoalForm(false);
    };

    const handleDeleteGoal = id => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-medium mb-5">Goals and Tasks</h2>
            <button
                onClick={() => setShowGoalForm(true)}
                className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 mb-5"
            >
                Add Goal
            </button>
            {showGoalForm && (
                <GoalForm
                    onAddGoal={handleAddGoal}
                    onUpdateGoal={handleUpdateGoal}
                    goal={selectedGoal}
                />
            )}
            {goals.map(goal => (
                <Goal
                    key={goal.id}
                    goal={goal}
                    handleDeleteGoal={handleDeleteGoal}
                    handleEditGoal={handleEditGoal}
                    tasks={goal.tasks}
                />
            ))}
        </div>
    );
};

export default GoalsAndTasks;
