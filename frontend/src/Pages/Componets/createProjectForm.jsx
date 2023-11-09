import {useState} from 'react';
import {FaPlus} from "react-icons/all.js";
import fetcher from "../../fetcher";
function CreateProjectForm() {

    const [filds, setFilds] = useState({
        title:"",
        description:"",
        deadline:""
        });


    const inputHandler= (event)=>{
        setFilds({...filds, [event.target.name]:event.target.value});
        fetcher.getUser()
            .then(responce=>{
                console.log(responce.data);
        })
    }

    const submitHandler = (event)=>{
        event.preventDefault();
        console.log(filds);
    }
    return (
        <div className="p-2 text-start">
          {/* row */}
          <div className="flex flex-wrap flex-row">
            <div className="flex-shrink max-w-full px-4 w-full">   
              <p className="text-xl font-bold mt-3 mb-5">Create new project</p>
            </div>                                                 
            <div className="flex-shrink max-w-full px-4 w-full mb-6">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
                <form onSubmit={submitHandler} className="flex flex-wrap flex-row -mx-4">
                  <div className="flex-shrink max-w-full px-4 w-full mb-4">
                    <label htmlFor="inputtitle" className="inline-block mb-2">Project title</label>
                    <input value={filds.title} onInput={inputHandler} name="title" type="text" className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="inputtitle" required />
                  </div>
                  <div className="flex-shrink max-w-full px-4 w-full mb-4">
                    <label htmlFor="inputdes" className="inline-block mb-2">Project description</label>
                    <textarea type="text"  value={filds.description} onInput={inputHandler} name="description" className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="inputdes"  required/>
                  </div>
                    <div className="flex-shrink max-w-full px-4 w-full mb-4">
                        <label htmlFor="deadline" className="inline-block mb-2">Project deadline</label>
                        <input value={filds.deadline} onInput={inputHandler} name="deadline" type="text" className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="deadline" required />
                    </div>

                  <div className="flex-shrink max-w-full px-4 w-full">
                    <button type="submit" className="py-2 px-4 block lg:inline-block text-center rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
                        Add new project
                        <FaPlus className="inline-block ltr:ml-1 rtl:mr-1 bi bi-plus-lg"/>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}

export default CreateProjectForm;