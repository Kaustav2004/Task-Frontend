import React, { useContext, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { TaskContext } from '../ContextAPI/taskContext';

interface TaskCardProps {
  id: string;
  tag: string;
  title: string;
  description: string;
  deadline: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, tag, title, description, deadline }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(tag);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editDeadline, setEditDeadline] = useState(deadline.split('T')[0]);
  const taskContext = useContext(TaskContext);

  const getPriorityClass = () => {
    if (selectedStatus === 'To Do') return 'bg-orange-100 text-orange-500';
    if (selectedStatus === 'In Progress') return 'bg-yellow-100 text-yellow-500';
    if (selectedStatus === 'Expired') return 'bg-red-100 text-red-500';
    if (selectedStatus === 'Completed') return 'bg-green-100 text-green-500';
    return 'bg-gray-100 text-gray-500';
  };

  const handleIconClick = () => setIsDropdownOpen(!isDropdownOpen);

  const handleDeleteClick =  () => {
    setIsDropdownOpen(false);
     taskContext.deleteTask({id});
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
    setIsDropdownOpen(false);
  };

  const handleSaveClick =  () => {
    setIsEditing(false);
    taskContext.updateTask({
      id,
      title: editTitle,
      description: editDescription,
      deadline: editDeadline,
      status: selectedStatus,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-5 relative w-full">
      {/* Priority Badge */}
      <div className="flex justify-between items-center">
        <div className={`px-2 py-1 text-xs w-fit font-semibold rounded ${getPriorityClass()}`}>
          {selectedStatus}
        </div>

        <FaEllipsisV className="cursor-pointer" onClick={handleIconClick} />
      </div>

      {isDropdownOpen && (
        <div className="absolute right-4 top-10 bg-white shadow-lg rounded-lg p-3 w-40 z-10">
          <button onClick={handleDeleteClick} className="block w-full text-left text-red-500 mb-2">
            Delete
          </button>
          <button onClick={handleUpdateClick} className="block w-full text-left text-blue-500">
            Update
          </button>
        </div>
      )}

      {/* Edit Mode */}
      {isEditing ? (
        <div className="mt-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="date"
            value={editDeadline}
            onChange={(e) => setEditDeadline(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          >
            {['To Do', 'In Progress', 'Completed'].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            onClick={handleSaveClick}
            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          {/* Title and Description */}
          <h3 className="text-xl font-semibold text-gray-900 mt-2">{title}</h3>
          <p className="text-gray-500 mt-1 text-sm break-words">{description}</p>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 text-gray-700 text-sm">
            <span className="font-semibold">Deadline: {editDeadline}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
