const express = require("express");

const app = express();

app.use(express.json());

let tasks = [];
let nextId = 1;

// GET all tasks
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// GET task by ID
app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);
});

// CREATE task
app.post("/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const task = {
        id: nextId++,
        title,
        completed: false
    };

    tasks.push(task);

    res.status(201).json(task);
});

// UPDATE task
app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
        task.title = title;
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

    res.status(200).json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks.splice(index, 1);

    res.status(204).send();
});

module.exports = app;