// mongodb+srv://IshitaBansal:<db_password>@cluster0.joz2so7.mongodb.net/?appName=Cluster0

// const express = require("express");
import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"  // secret keys hide
dotenv.config(); 

const app = express();
const PORT = 3000;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB...", err));


// id dene ki need ni, mongodb automatically creates id 
const todoSchema = new mongoose.Schema({
    task : {
        type : String,
        required : true
    },
    completed : {
        type : Boolean,
        default : false
    }
})

// model bna rhe h ab schema se 
const Todo = mongoose.model('Todo', todoSchema);


app.use(express.json()); // pdhna h iske baare mein


app.get('/', (req, res) => {
    res.send("Hello World!");
});

// let todos = [
//     { id: 1, task: "Learn Node.js", completed: false },
//     { id: 2, task: "Build an API", completed: false }
// ];

// GET all todos
app.get('/todos', async(req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// to add some todos in todos in mondodb
app.post('/todos', async(req, res) => {
    // const newTask = req.body.task;
    // const newCompleted = req.body.completed;
    // const newTodo = {
    //     id : todos.length + 1,
    //     task : newTask,
    //     completed : newCompleted
    // };
    // todos.push(newTodo);

    // ab hm new todo bnayege and mongodb mei psh krege is new todo ko
    const newTodo = new Todo({
        task : req.body.task
    })
    await newTodo.save();

    res.status(201).json({"message" : "Todo added successfully", "todo" : newTodo});
})

// PUT (Update) a todo
app.put('/todos/:id', async(req, res) => {
    try{
        const updateTodo = await Todo.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new : true}
        )
        res.status(202).json({"message":"Updated successfully", "todo": updateTodo})
    }catch(e){
        res.status(500).json({"erros" : e.message})
    }
    // const id = parseInt(req.params.id);
    // const todo = todos.find(t => t.id === id);

    // if (!todo) {
    //     return res.status(404).json({ message: "Todo not found" });
    // }

    // todo.completed = req.body.completed; // Update logic
    // res.status(201).json({"status" : "sb badhiya ho gya", "todo" : todo});

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
app.delete('/todos/:id', async(req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({"message" : "Deleted successfully"});




    // const id = parseInt(req.params.id);
    // todos = todos.filter(t => t.id !== id); // Keep everything EXCEPT this id

    // res.status(204).send(); // 204 = No Content (Successful but nothing to send back)
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});