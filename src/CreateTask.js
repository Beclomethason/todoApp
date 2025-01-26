import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/todos', { title }) // API endpoint to create a todo
            .then(response => {
                onTaskCreated(response.data); // Notify parent component about the new task
                setTitle(''); // Clear input field
            })
            .catch(error => {
                console.error("Error creating task:", error);
            });
    };

    return (
        <div>
            <h2 className="mb-3">Create Task</h2>
            <form onSubmit={handleSubmit} className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter task"
                />
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    );
};

export default CreateTask;
