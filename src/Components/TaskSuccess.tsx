import React, { useContext } from 'react';
import { FiCheck } from 'react-icons/fi';
import { TaskContext } from '../ContextAPI/taskContext';
import taskTickImg from '../Assets/Tick-Square.png'
const TaskSuccess = () => {
    const taskContext = useContext(TaskContext);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-[30px] shadow-lg p-6 w-[315px] text-center flex justify-center items-center flex-col gap-2">
      <img src={taskTickImg}></img>
      <p className="text-lg font-poppins font-medium text-gray-800">new task has been created 
      successfully</p>
      <button
        onClick={()=>taskContext.settaskSuccess(false)}
        className="bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
      >
        Back
      </button>
    </div>
  </div>
  )
}

export default TaskSuccess;
