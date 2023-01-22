import React from 'react';

const Project = ({ project }) => {
  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
      <td className="p-2 border-t border-gray-200 dark:border-gray-700 dark:text-slate-200">{project.name}</td>
      <td className="p-2 border-t border-gray-200 dark:border-gray-700 dark:text-slate-200">
        <span className={`px-2 py-1 rounded-md text-white ${project.isCompleted ? 'bg-green-500' : 'bg-red-500'}`}>
          {project.isCompleted ? 'Completed' : 'Not Completed'}
        </span>
      </td>
    </tr>
  );
};

const ProjectList = ({ projects, tab }) => {
  // const filteredProjects = projects.filter((project) => {
  //   if (tab === 1) {
  //     return true;
  //   } else if (tab === 2) {
  //     return project.isCompleted;
  //   } else {
  //     return !project.isCompleted;
  //   }
  // });

  return (
    
    <div className="flex-shrink max-w-full px-4 w-full lg:w-1/2 mb-6">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full p-6">
      <div className="flex flex-row justify-between pb-6">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">Leaderboard</h3>
        </div>
      </div>
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="table-bordered-bottom table-sm w-full text-sm ltr:text-left rtl:text-right">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Users</th>
                <th>Progress</th>
                <th>Task</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="leading-5">#1</div>
                </td>
                <td>
                  <div className="flex flex-wrap flex-row items-center">
                    <div className="leading-5 font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                      John Thomas
                    </div>
                    <div className="leading-5 text-gray-500 flex-shrink max-w-full w-full">
                      UI/UX
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <span className="ltr:mr-2 rtl:ml-2">78%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-green-300">
                        <div style={{width: '78%'}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500">
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="leading-5">39/50</div>
                </td>
                <td className="px-3 py-4 whitespace-no-wrap text-center leading-5 font-medium">
                  <a href="index-projects.html#" className="py-2 px-3 text-center mb-3 inline-block rounded leading-5 text-indigo-500 bg-transparent border border-indigo-500 hover:text-gray-100 hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:text-gray-100 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline w-4 h-4 bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="leading-5">#2</div>
                </td>
                <td>
                  <div className="flex flex-wrap flex-row items-center">
                    <div className="leading-5 font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                      Carlos Garcia
                    </div>
                    <div className="leading-5 text-gray-500 flex-shrink max-w-full w-full">
                      Front End
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <span className="ltr:mr-2 rtl:ml-2">70%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-300">
                        <div style={{width: '70%'}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500">
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="leading-5">35/50</div>
                </td>
                <td className="text-center">
                  <a href="index-projects.html#" className="py-2 px-3 text-center mb-3 inline-block rounded leading-5 text-indigo-500 bg-transparent border border-indigo-500 hover:text-gray-100 hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:text-gray-100 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline w-4 h-4 bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="leading-5">#3</div>
                </td>
                <td>
                  <div className="flex flex-wrap flex-row items-center">
                    <div className="leading-5 font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                      Daniel Esteban
                    </div>
                    <div className="leading-5 text-gray-500 flex-shrink max-w-full w-full">
                      Back End
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <span className="ltr:mr-2 rtl:ml-2">66%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-yellow-300">
                        <div style={{width: '66%'}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500">
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="leading-5">33/50</div>
                </td>
                <td className="text-center">
                  <a href="index-projects.html#" className="py-2 px-3 text-center mb-3 inline-block rounded leading-5 text-indigo-500 bg-transparent border border-indigo-500 hover:text-gray-100 hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:text-gray-100 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline w-4 h-4 bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="leading-5">#4</div>
                </td>
                <td>
                  <div className="flex flex-wrap flex-row items-center">
                    <div className="leading-5 font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                      Steven Rey
                    </div>
                    <div className="leading-5 text-gray-500 flex-shrink max-w-full w-full">
                      Developer
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <span className="ltr:mr-2 rtl:ml-2">58%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-yellow-300">
                        <div style={{width: '58%'}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500">
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="leading-5">29/50</div>
                </td>
                <td className="text-center">
                  <a href="index-projects.html#" className="py-2 px-3 text-center mb-3 inline-block rounded leading-5 text-indigo-500 bg-transparent border border-indigo-500 hover:text-gray-100 hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:text-gray-100 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline w-4 h-4 bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="leading-5">#5</div>
                </td>
                <td>
                  <div className="flex flex-wrap flex-row items-center">
                    <div className="leading-5 font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                      Roman Davis
                    </div>
                    <div className="leading-5 text-gray-500 flex-shrink max-w-full w-full">
                      UI/UX
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <span className="ltr:mr-2 rtl:ml-2">54%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-pink-300">
                        <div style={{width: '54%'}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500">
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="leading-5">27/50</div>
                </td>
                <td className="text-center">
                  <a href="index-projects.html#" className="py-2 px-3 text-center mb-3 inline-block rounded leading-5 text-indigo-500 bg-transparent border border-indigo-500 hover:text-gray-100 hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:text-gray-100 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline w-4 h-4 bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProjectList;