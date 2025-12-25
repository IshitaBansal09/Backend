let todos = [
    { id: 1, task: "Learn Node.js", completed: false },
    { id: 2, task: "Build an API", completed: false }
];



const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json()); // pdhna h iske baare mein

// GET all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.post('/todos', (req, res) => {
    const newTask = req.body.task;
    const newCompleted = req.body.completed;
    const newTodo = {
        id : todos.length + 1,
        task : newTask,
        completed : newCompleted
    };

    todos.push(newTodo);
    res.status(201).json({"status" : "sb badhiya ho gya", "todo" : newTodo});
})

// PUT (Update) a todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = req.body.completed; // Update logic
    res.status(201).json({"status" : "sb badhiya ho gya", "todo" : todo});
});

app.put('/todos', (req, res) => {
    const id = req.body.id;
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = req.body.completed; // Update logic
    res.status(201).json({"status" : "sb badhiya ho gya", "todo" : todo});
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id); // Keep everything EXCEPT this id

    res.status(204).send(); // 204 = No Content (Successful but nothing to send back)
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});