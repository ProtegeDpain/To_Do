// // components/TaskList.js

import React from 'react';
import TaskItem from './TaskItem';
import { useState } from 'react';



import EditTask from './EditTask';
import { FaRegEdit, FaTrashAlt, FaCheck } from 'react-icons/fa'; // Importing icons

const TaskList = ({ tasks, onDelete, setTasks, onToggle }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleUpdate = (updatedTask) => {
    // Update the task in the state
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="flex justify-between items-center border-b py-2">

          <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
          <div className="flex space-x-2">
            <button onClick={() => onToggle(task.id)}>{task.completed ? 'Undo' : 'Complete'}</button>
            <button onClick={() => setEditingTask(task)} className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"><FaRegEdit /></button>
            <button onClick={() => onDelete(task.id) } className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"><FaTrashAlt /></button>
          </div>
        </div>
      ))}
      {editingTask && (
        <EditTask task={editingTask} onUpdate={handleUpdate} />
      )}
    </div>
    
  );
};

export default TaskList;
