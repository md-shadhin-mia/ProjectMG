import './App.css';
import TopNavigation from './topNavigation';
import { useEffect } from 'react';
import Sidebar from './sideNavigation';
import Dashboard from './Pages/Dashboard';

import { CategoryScale, Chart, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

function App() {

  useEffect(
    ()=>{
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  );
  
  return (
    <div className="App min-h-screen font-sans text-base font-normal text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
        <Sidebar />
        <div className='md:pl-16 lg:pl-48'>
          <TopNavigation />
          <div className="main container p-4">
          <Dashboard />
          </div>
        </div>
      
    </div>
  );
}

export default App;
