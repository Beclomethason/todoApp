import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/todos')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const addTask = () => {
        if (newTaskTitle.trim() === '') return;
        axios.post('http://localhost:5000/api/todos', { title: newTaskTitle })
            .then(response => {
                setTasks([...tasks, response.data]);
                setNewTaskTitle('');
            })
            .catch(error => console.error('Error adding task:', error));
    };

    const removeTask = (id) => {
        axios.delete(`http://localhost:5000/api/todos/${id}`)
            .then(() => {
                setTasks(tasks.filter(task => task._id !== id));
            })
            .catch(error => console.error('Error removing task:', error));
    };

    const markAsDone = (id) => {
        setTasks(tasks.map(task => 
            task._id === id ? { ...task, done: true } : task
        ));
    };

    return (
        <div className="App">
            <div className="container">
                <h2>Todo List</h2>
                <form>
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Enter a task"
                    />
                    <button type="button" onClick={addTask}>Add Task</button>
                </form>
                <ul className="list-group">
                    {tasks.map((task, index) => (
                        <li className="list-group-item" key={task._id}>
                            <div className="task-content">
                                <span className="task-index">{index + 1}</span>
                                <span className="task-title">{task.title}</span>
                               
                            </div>
                            <button onClick={() => removeTask(task._id)} className="remove-button">Done?</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
