// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // Port for your API

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory task storage

let tasks = [
    { id: 1, title: 'First Task', description: 'Task description', status: 'todo', due_date: null },

  ];
  

// API Endpoints
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = { id: tasks.length + 1, title: req.body.title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;
    const task = tasks.find(t => t.id == id);
    if (task) {
      task.title = title;
      task.description = description;
      task.status = status;
      task.due_date = due_date;
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  });
  

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
