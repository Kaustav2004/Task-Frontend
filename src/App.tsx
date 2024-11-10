import React, { useContext } from 'react';
import './App.css';
import TaskList from './Components/TaskList';
import TaskSlider from './Components/TaskSlider';
import AddTask from './Components/AddTask';
import { TaskContext } from './ContextAPI/taskContext';
import TaskSuccess from './Components/TaskSuccess';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { SlArrowDown } from "react-icons/sl";

function App() {
  const taskContext = useContext(TaskContext);
  if(taskContext.loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>

    )
  } 
    
  return (
    <div className="flex flex-col h-screen overflow-y-auto">

      {/* Search and Filter */}
      <div className=" bg-gray-200 p-4 shadow-md flex items-center justify-between ">
        {/* Search Input */}
        <div className="flex items-center bg-white p-2 rounded-[22px] shadow-sm w-full max-w-xs md:max-w-md lg:max-w-lg">
          <FaSearch className="text-gray-400 mx-2" />
          <input
            type="text"
            placeholder="Search Project"
            className="outline-none bg-transparent font-poppins font-medium flex-1 text-gray-600"
          />
        </div>

        {/* Filter Button */}
        <button className="items-center gap-3 text-gray-600 bg-white p-2 rounded-lg shadow-sm ml-4 hidden md:flex">
          <FaFilter className="text-gray-400" />
          <span>Filter </span>
          <SlArrowDown/>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center flex-1 p-4 gap-4">
        
        {/* Task List Container */}
        <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
          <TaskList />
        </div>

        {/* Task Slider Container */}
        <div className="w-full ">
          <TaskSlider />
        </div>
      </div>

      {/* Add Task Modal */}
      {taskContext.openAddTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 p-4">
          <AddTask />
        </div>
      )}

      {/* Task Success Modal */}
      {taskContext.taskSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 p-4">
          <TaskSuccess />
        </div>
      )}
    </div>
  );
}

export default App;
