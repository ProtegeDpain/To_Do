// components/TaskItem.js

import React from 'react';

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <li className="flex justify-between items-center p-2 border-b border-gray-300">
      <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
        {task.title}
      </span>
      <div>
        <button
          onClick={() => onToggle(task.id)}
          className="mr-2 p-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
