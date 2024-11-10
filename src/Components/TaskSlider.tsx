import React, { useContext } from 'react';
import { TaskContext } from '../ContextAPI/taskContext';
import TaskItem from './TaskItem';

const TaskSlider = () => {
    const taskContext = useContext(TaskContext);

    return (
        <div className="flex flex-wrap gap-5 justify-center ">
            {/* To Do Section */}
            <div className="bg-[#ECEDEE] rounded-lg p-5 md:p-7 flex flex-col w-full md:w-[354px] h-fit">
                <div className="flex justify-center items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#5030E5]"></div>
                    <div className="font-inter font-medium text-base text-[#0D062D]">To Do</div>
                    <div className="bg-[#E0E0E0] text-center text-[#625F6D] font-inter rounded-full w-5 h-5 text-xs">
                        {taskContext.toDoTask.length}
                    </div>
                </div>
                <div className="mt-4 md:mt-5 w-full h-1 bg-[#5030E5]"></div>
                {taskContext.toDoTask &&
                    taskContext.toDoTask.map((task: any) => (
                        <TaskItem
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            tag="To Do"
                            description={task.description}
                            deadline={task.deadline}
                        />
                    ))}
            </div>

            {/* In Progress Section */}
            <div className="bg-[#ECEDEE] rounded-lg p-5 md:p-7 flex flex-col w-full md:w-[354px] h-fit">
                <div className="flex justify-center items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FFA500]"></div>
                    <div className="font-inter font-medium text-base text-[#0D062D]">On Progress</div>
                    <div className="bg-[#E0E0E0] text-center text-[#625F6D] font-inter rounded-full w-5 h-5 text-xs">
                        {taskContext.inprogressTask.length}
                    </div>
                </div>
                <div className="mt-4 md:mt-5 w-full h-1 bg-[#FFA500]"></div>
                {taskContext.inprogressTask &&
                    taskContext.inprogressTask.map((task: any) => (
                        <TaskItem
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            tag="In Progress"
                            description={task.description}
                            deadline={task.deadline}
                        />
                    ))}
            </div>

            {/* Completed Section */}
            <div className="bg-[#ECEDEE] rounded-lg p-5 md:p-7 flex flex-col w-full md:w-[354px] h-fit">
                <div className="flex justify-center items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#8BC48A]"></div>
                    <div className="font-inter font-medium text-base text-[#0D062D]">Done</div>
                    <div className="bg-[#E0E0E0] text-center text-[#625F6D] font-inter rounded-full w-5 h-5 text-xs">
                        {taskContext.completedTask.length}
                    </div>
                </div>
                <div className="mt-4 md:mt-5 w-full h-1 bg-[#8BC48A]"></div>
                {taskContext.completedTask &&
                    taskContext.completedTask.map((task: any) => (
                        <TaskItem
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            tag="Completed"
                            description={task.description}
                            deadline={task.deadline}
                        />
                    ))}
            </div>
        </div>
    );
};

export default TaskSlider;
