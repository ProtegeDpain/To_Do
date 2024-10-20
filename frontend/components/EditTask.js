import { useState } from 'react';

const EditTask = ({ task, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [due_date, setDueDate] = useState(task.due_date || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...task, title, description, status, due_date });
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded mb-4"
          placeholder="Task Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded mb-4"
          placeholder="Description"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full rounded mb-4"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          value={due_date}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 w-full rounded mb-4"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
