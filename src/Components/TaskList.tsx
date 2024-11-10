import React, { useContext } from 'react';
import { TaskContext } from '../ContextAPI/taskContext';
import expiredImg from '../Assets/Expired.png';
import activeImg from '../Assets/Active.png';
import completedImg from '../Assets/Completed.png';

const TaskList = () => {
    const contextTask = useContext(TaskContext);
    const allActive = contextTask.toDoTask.length + contextTask.inprogressTask.length + contextTask.completedTask.length;

    return (
        <div className="flex flex-col gap-4 w-full max-w-xs md:max-w-sm lg:max-w-md p-4 mx-auto">
            {/* Expired Tasks */}
            <div className="flex flex-col gap-2 bg-[#ECEDEE] rounded-lg p-4 shadow-md">
                <img src={expiredImg} alt="Expired Tasks" className="w-12 h-12 mx-auto md:mx-0" />
                <p className="font-poppins font-medium text-[#797979] text-center md:text-left">Expired Tasks</p>
                <p className="text-[#060606] font-poppins font-medium leading-tight text-2xl text-center md:text-left">
                    {contextTask.expireTask.length}
                </p>
            </div>

            {/* Active Tasks */}
            <div className="flex flex-col gap-2 bg-[#ECEDEE] rounded-lg p-4 shadow-md">
                <img src={activeImg} alt="Active Tasks" className="w-12 h-12 mx-auto md:mx-0" />
                <p className="font-poppins font-medium text-[#797979] text-center md:text-left">All Active Tasks</p>
                <p className="text-[#060606] font-poppins font-medium leading-tight text-2xl text-center md:text-left">
                    {allActive}
                </p>
            </div>

            {/* Completed Tasks */}
            <div className="flex flex-col gap-2 bg-[#ECEDEE] rounded-lg p-4 shadow-md">
                <img src={completedImg} alt="Completed Tasks" className="w-12 h-12 mx-auto md:mx-0" />
                <p className="font-poppins font-medium text-[#797979] text-center md:text-left">Completed Tasks</p>
                <p className="text-[#060606] font-poppins font-medium leading-tight text-2xl text-center md:text-left">
                    {contextTask.completedTask.length}/{contextTask.alltasks.length}
                </p>
            </div>

            {/* Add Task Button */}
            <button
                className="bg-[#0D062D] text-white py-2 px-4 rounded-full h-12 mt-4 w-full"
                onClick={() => contextTask.setopenAddTask(!contextTask.openAddTask)}
            >
                + Add Task
            </button>
        </div>
    );
};

export default TaskList;
