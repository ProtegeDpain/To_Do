// import { useEffect, useState } from 'react';
// import TaskList from '../components/TaskList';

// export default function Home() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');

//   useEffect(() => {
//     // Fetch tasks from the back-end
//     const fetchTasks = async () => {
//       const response = await fetch('http://localhost:5000/api/tasks');
//       const data = await response.json();
//       setTasks(data);
//     };
//     fetchTasks();
//   }, []);

//   const addTask = async () => {
//     if (newTask.trim()) {
//       const response = await fetch('http://localhost:5000/api/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title: newTask }),
//       });
//       const data = await response.json();
//       setTasks([...tasks, data]);
//       setNewTask(''); 
//     }
//   };

//   const deleteTask = async (id) => {
//     await fetch(`http://localhost:5000/api/tasks/${id}`, {
//       method: 'DELETE',
//     });
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   const toggleTaskCompletion = async (id) => {
//     const task = tasks.find((task) => task.id === id);
//     const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ completed: !task.completed }),
//     });
//     const updatedTask = await response.json();
//     setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <div className="max-w-xl mx-auto bg-white p-5 rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
//         <div className="mb-4">
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             className="border p-2 w-full rounded"
//             placeholder="Add a new task"
//           />
//           <button
//             onClick={addTask}
//             className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//           >
//             Add Task
//           </button>
//         </div>
//         <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTaskCompletion} />
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import EditTask from '../components/EditTask'; // Import the EditTask component

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null); // State for editing task

  useEffect(() => {
    // Fetch tasks from the back-end
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:5000/api/tasks');
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim()) {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTask, description: '', status: 'todo', due_date: null }),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
      setNewTask(''); 
    }
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = async (id) => {
    const task = tasks.find((task) => task.id === id);
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !task.completed }),
    });
    const updatedTask = await response.json();
    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
  };

  const updateTask = async (updatedTask) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();
    setTasks(tasks.map((task) => (task.id === data.id ? data : task)));
    setEditingTask(null); // Clear the editing task state
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Add a new task"
          />
          <button
            onClick={addTask}
            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </div>
        <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTaskCompletion} setTasks={setTasks} setEditingTask={setEditingTask} />
        {editingTask && (
          <EditTask task={editingTask} onUpdate={updateTask} />
        )}
      </div>
    </div>
  );
}
