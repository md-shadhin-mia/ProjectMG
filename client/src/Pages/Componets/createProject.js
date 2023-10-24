function CreateProject() {
    return (

        <div className="p-2 text-start">
          {/* row */}
          <div className="flex flex-wrap flex-row">
            <div className="flex-shrink max-w-full px-4 w-full">   
              <p className="text-xl font-bold mt-3 mb-5">Create new project</p>
            </div>                                                 
            <div className="flex-shrink max-w-full px-4 w-full mb-6">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
                <form className="flex flex-wrap flex-row -mx-4">
                  <div className="flex-shrink max-w-full px-4 w-full mb-4">
                    <label htmlFor="inputtitle" className="inline-block mb-2">Project title</label>
                    <input type="text" className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="inputtitle" />
                  </div>
                  <div className="flex-shrink max-w-full px-4 w-full mb-4">
                    <label htmlFor="inputdes" className="inline-block mb-2">Project description</label>
                    <textarea type="text" className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="inputdes" defaultValue={""} /> 
                  </div>
                  <div className="flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <label htmlFor="inputbudget" className="inline-block mb-2">Project Budget</label>
                    <input type="text" className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="inputbudget" />
                  </div>
                  <div className="flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <label htmlFor="inputtask" className="inline-block mb-2">Total Task</label>
                    <input type="text" className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="inputtask" />
                  </div>
                  
                  <div className="flex-shrink max-w-full px-4 w-full mb-4">
                    <label htmlFor="rangetime" className="inline-block mb-2">Start and End date</label>
                    <div id="rangetime" className="flex flex-col justify-center md:flex-row md:justify-between">
                      <input id="startDate" className="startDate w-full leading-5 relative text-sm py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600 flatpickr-input" type="text" name="start" />
                      <span className="px-4 text-center">to</span>
                      <input id="endDate" className="endDate w-full leading-5 relative text-sm py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" type="text" name="end" data-fp-omit />  
                    </div>
                  </div>
                 
                  <div className="flex-shrink max-w-full px-4 w-full">
                    <button type="submit" className="py-2 px-4 block lg:inline-block text-center rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">Add new project <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="currentColor" className="inline-block ltr:ml-1 rtl:mr-1 bi bi-plus-lg" viewBox="0 0 16 16">
                        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                      </svg></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}

export default CreateProject;