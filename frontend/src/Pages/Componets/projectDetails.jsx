const ProjectDetails = function() {
      return (
        <div className="flex-shrink max-w-full w-full my-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
            <div className="flex flex-row justify-between pb-4">
              <div className="flex flex-col">
                <h3 className="text-base font-bold">Web Development</h3>
              </div>
              <div x-data="{ open: false }" className="relative">
                <button className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200 focus:outline-none hover:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 bi bi-three-dots" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </button>
                <div x-show="open" className="origin-top-right absolute ltr:right-0 rtl:left-0 rounded rounded-t-non bg-white dark:bg-gray-800 z-10 border border-gray-200 dark:border-gray-700" style={{minWidth: '12rem', display: 'none'}}>
                  <a className="block px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-20 dark:focus:bg-gray-900" href="#">Update</a>
                  <a className="block px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-20 dark:focus:bg-gray-900" href="#">Delete</a>
                </div>
              </div>
            </div>
            <div className="flex flex-col pb-4">
                <p className="text-sm text-gray-500">Creating a website redesign project plan is vital to making your redesign go smoothly.There’s who you think your customers are, who you want your customers to be. </p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2 py-1 flex items-center font-semibold text-xs rounded text-yellow-700 bg-yellow-200">On Progress</span>
              <span className="px-2 py-1 flex items-center font-semibold text-xs rounded text-red-400 border border-red-400  bg-white">Due date: 15-11-2022</span>
            </div>
            <div className="relative mb-4">
              <a href="#">
                <img className="inline-block rounded-full shadow-xl w-12 h-12 max-w-full ltr:-mr-4 rtl:-ml-4 border-2 bg-gray-300 border-gray-200 transform hover:-translate-y-1" src="../src/img/avatar/avatar2.png" alt="Image Description" />
              </a>
              <a href="#">
                <img className="inline-block rounded-full shadow-xl w-12 h-12 max-w-full ltr:-mr-4 rtl:-ml-4 border-2 bg-gray-300 border-gray-200 transform hover:-translate-y-1" src="../src/img/avatar/avatar3.png" alt="Image Description" />
              </a>
              <a href="#">
                <img className="inline-block rounded-full shadow-xl w-12 h-12 max-w-full ltr:-mr-4 rtl:-ml-4 border-2 bg-gray-300 border-gray-200 transform hover:-translate-y-1" src="../src/img/avatar/avatar4.png" alt="Image Description" />
              </a>
              <a href="#">
                <span className="ltr:ml-5 rtl:mr-5 text-sm text-gray-500 font-semibold self-center">+2 more</span>
              </a>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full mt-2">
              <div className="h-full text-center text-xs text-white bg-indigo-500 rounded-full" style={{width: '55%'}}>
                <span className="text-xs text-white text-center">55%</span>
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <div>
                <span className="text-sm inline-block text-gray-500 dark:text-gray-100">Task done : <span className="text-gray-700 dark:text-white font-bold">26</span>/50</span>
              </div>
              <div>
                <span className="px-2 py-1 text-xs rounded font-semibold text-green-500 bg-green-50">Front End</span>
                <span className="px-2 py-1 text-xs rounded text-indigo-500 font-semibold bg-indigo-100">UI/UX</span>
              </div>
            </div>
          </div>
        </div>
      )
}

export default ProjectDetails;