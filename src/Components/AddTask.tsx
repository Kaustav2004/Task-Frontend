import React, { useContext, useState } from 'react';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TaskContext } from '../ContextAPI/taskContext';

const AddTask = () => {
    const taskContext = useContext(TaskContext);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleDeadlineClick = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const dateChangeHandler = (date: Date | null) => {
        setDeadline(date);
        setIsCalendarOpen(false);
    };

    const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const descHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
    };

    const handleAssignClick = () => {
        if (title && desc && deadline) {
            taskContext.addTask({ title, desc, deadline:deadline.toLocaleDateString() });
            setTitle('');
            setDeadline(null);
            setDesc('');
        } else {
            alert('Please fill in all fields before assigning.');
        }
    };

    return (
        <div className="flex flex-col gap-2 p-5 w-[333px] rounded-xl relative border border-gray-300 shadow-lg h-fit bg-white">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#20E7F4] rounded-full"></div>
                    <div className="font-poppins font-semibold text-xl">ADD TASK</div>
                </div>
                <FaPlus className="text-[#0D25FF] cursor-pointer" />
            </div>

            <div className="w-full h-1 bg-[#E1E2EA]"></div>

            <div className="flex justify-between items-center">
                <input
                    className="font-poppins font-bold text-lg border-none outline-none w-full bg-transparent"
                    type="text"
                    value={title}
                    onChange={titleHandler}
                    placeholder="Enter Task Title"
                />
                <FaEllipsisV className="text-gray-500 cursor-pointer" />
            </div>

            <div className="bg-black w-full h-[1px]"></div>

            <textarea
                className="font-poppins font-normal text-base min-h-[318px] h-fit border-none outline-none resize-none bg-transparent"
                value={desc}
                onChange={descHandler}
                placeholder="Enter Task Description"
            ></textarea>

            <div className="flex justify-between font-poppins font-bold text-xs text-[#5A5A5A]">
                <div className="cursor-pointer" onClick={handleDeadlineClick}>
                    {deadline ? `Deadline: ${deadline.toLocaleDateString()}` : 'Deadline'}
                </div>
                <div className="cursor-pointer" onClick={handleAssignClick}>Assigned to</div>
            </div>

            {/* Calendar Popup */}
            {isCalendarOpen && (
                <div className="absolute mt-2 z-10 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex items-center justify-center">
                    <DatePicker
                        selected={deadline}
                        onChange={dateChangeHandler}
                        inline
                    />
                </div>
            )}
        </div>
    );
};

export default AddTask;
