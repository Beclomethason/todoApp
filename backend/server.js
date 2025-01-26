const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mongoose connection
mongoose.connect('mongodb+srv://Beclomethason:Raja%40123@cluster0.7r0zg.mongodb.net/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Schema and model
const todoSchema = new mongoose.Schema({ title: String });
const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/api/todos', async (req, res) => {
    const todo = new Todo({ title: req.body.title });
    await todo.save();
    res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
