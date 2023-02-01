import React, { useState } from 'react';
import TabControl from './Componets/tabControl';
import ProjectList from './Componets/ListofProjects';
import ProjectAddAndSearch from './Componets/projectAddAndSearch';
import ProjectDetails from './Componets/projectDetails';
import ProjectChart from './Componets/projectChart';
import CreateProject from './Componets/createProject';

const projectsJson = `{
    "projects": [
      {
        "id": 1,
        "name": "Project A",
        "isCompleted": true
      },
      {
        "id": 2,
        "name": "Project B",
        "isCompleted": false
      },
      {
        "id": 3,
        "name": "Project C",
        "isCompleted": true
      },
      {
        "id": 4,
        "name": "Project D",
        "isCompleted": false
      },
      {
        "id": 5,
        "name": "Project E",
        "isCompleted": true
      }
    ]
  }
  `;

const Dashboard = () => {
  const [tab, setTab] = useState(1); // 1 = all, 2 = completed, 3 = not completed
  const [projects, setProjects] = useState(JSON.parse(projectsJson).projects);

  return (
    <div>
      <ProjectAddAndSearch />
      <ProjectDetails />

      <div className='flex flex-col md:flex-row'>
        <ProjectChart/>
        <ProjectList />
      </div>
      <CreateProject />
    </div>
  );
};

export default Dashboard;
