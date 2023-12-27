import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import fetcher from '../../fetcher';

const ProjectChart = () => {
    const [report, setReport] = useState(null);

    useEffect(() => {
        fetcher.getReportSummary().then(res => setReport(res.data)).catch(() => {});
    }, []);

    const labels = report ? report.projects.map(p => p.title) : [];
    const taskData = report ? report.projects.map(p => p.taskCount) : [];
    const completedData = report ? report.projects.map(p => p.completedTasks) : [];

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Tasks',
                data: taskData,
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderColor: 'rgba(99, 102, 241, 0.5)',
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(99, 102, 241, 0.8)',
                tension: 0.3
            },
            {
                label: 'Completed Tasks',
                data: completedData,
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                borderColor: 'rgba(14, 165, 233, 0.5)',
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(14, 165, 233, 0.8)',
                tension: 0.3
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    boxWidth: 8,
                    boxHeight: 8,
                    usePointStyle: true,
                    font: { size: 11, family: 'Inter' }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 10, family: 'Inter' } }
            },
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.04)' },
                ticks: { font: { size: 10, family: 'Inter' } }
            }
        }
    };

    return (
        <div className="card h-full">
            <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Analytics</h4>
            </div>
            <div className="h-64">
                {report ? <Line data={chartData} options={options} /> : <div className="flex items-center justify-center h-full text-gray-400 text-sm">Loading...</div>}
            </div>
        </div>
    );
};

export default ProjectChart;