import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import dummeydata from '../projectData';



const ProjectChart = () => {
    const projectData = dummeydata();
    const chartRef = useRef(null);
      const taskDates = projectData.goals.map(goal => goal.tasks.map(task => {
        if (task.completed && task.completed_time) {
          return {
            date: new Date(task.completed_time),
            deadline: new Date(task.deadline)
          }
        } else {
          return {
            date: new Date(),
            deadline: new Date(task.deadline)
          }
        }
      }));
  
      const goalDates = projectData.goals.map(goal => {
        const completedTasks = goal.tasks.filter(task => task.completed);
        if (completedTasks.length === goal.tasks.length) {
          return {
            date: new Date(Math.max(...completedTasks.map(task => new Date(task.completed_time)))),
            deadline: new Date(goal.deadline)
          }
        } else {
          return {
            date: new Date(),
            deadline: new Date(goal.deadline)
          }
        }
      });
  
      const taskLabels = taskDates.flat().map(d => d.date.toLocaleDateString());
      const taskData = taskDates.flat().map(d => (d.date - d.deadline) / (1000 * 60 * 60));
  
      const goalLabels = goalDates.map(d => d.date.toLocaleDateString());
      const goalData = goalDates.map(d => (d.date - d.deadline) / (1000 * 60 * 60));
  
       let  garaph ={
        type: 'line',
        data: {
            labels: taskLabels,
            datasets: [
                {
                    label: 'Task Completion Duration',
                    data: taskData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)'
                    ],
                    borderWidth: 4
                },
                {
                    label: 'Goal Completion Duration',
                    data: goalData,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)'
                    ],
                    borderWidth: 4
                    }
                ]
        },
        options: {
                responsive: true,
                title: {
                    text: 'Task and Goal Completion Duration',
                    display: true
                },
                scales: {
                    y: {
                        label: 'Duration (hours)',
                        beginAtZero: true
                    }
                }
            }
        }


    return (
      <div className="flex-shrink max-w-full px-4 w-full lg:w-1/2 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
            <Line data={garaph.data} ref={chartRef} options={garaph.options}/>
        </div>
      </div>
    );
};

export default ProjectChart;
