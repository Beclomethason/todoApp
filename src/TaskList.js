import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/todos') // API endpoint for fetching todos
            .then(response => {
                setTasks(response.data); // Populate state with fetched data
            })
            .catch(error => {
                console.error("Error fetching todos:", error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/todos/${id}`) // API endpoint to delete a todo
            .then(() => {
                setTasks(tasks.filter(task => task._id !== id)); // Update state in real-time
            })
            .catch(error => {
                console.error("Error deleting todo:", error);
            });
    };

    return (
        <div>
            <h2 className="mb-3">Tasks</h2>
            <ul className="list-group">
    {tasks.map((task, index) => (
        <li className={`list-group-item ${task.done ? 'done' : ''}`} key={task._id}>
            <div className="task-content">
                <span className="task-index">{index + 1}</span>
                <span className="task-title">{task.title}</span>
            </div>
            {!task.done && (
                <button onClick={() => markAsDone(task._id)} className="done-button">
                    Mark as Done
                </button>
            )}
            <button onClick={() => removeTask(task._id)} className="remove-button">Remove</button>
        </li>
    ))}
</ul>

        </div>
    );
};

export default TaskList;
