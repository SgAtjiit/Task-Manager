import React, { useState } from 'react'

const InputForm = () => {
    const [formData, setFormData] = useState({ date: '', task: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.date || !formData.task) {
            alert("Please fill in all fields");
            return;
        }
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = {
            date: formData.date,
            task: formData.task,
            isCompleted: false,
            id: Date.now(),
            priority: false
        };
        existingTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(existingTasks));
        alert('Form submitted successfully!');
        setFormData({ date: '', task: '' });
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4">
            <h1 className="text-4xl font-extrabold mb-10 text-center text-purple-400 drop-shadow-lg tracking-wide">
            Taskify: Your Own Task Manager
        </h1>
            <div className="max-w-xl mx-auto bg-gray-800 rounded-lg shadow p-8">
                <h1 className="text-3xl font-extrabold mb-6 text-blue-400 text-center">Add New Task</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-gray-300 font-semibold">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the date"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-300 font-semibold">Task</label>
                        <input
                            type="text"
                            name="task"
                            value={formData.task}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the task"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition font-bold"
                    >
                        Submit
                    </button>
                </form>
                {formData.date && formData.task && (
                    <p className="mt-6 text-center text-green-400">
                        You have entered: <span className="font-bold">{formData.date}</span> and <span className="font-bold">{formData.task}</span>
                    </p>
                )}
            </div>
        </div>
    )
}

export default InputForm