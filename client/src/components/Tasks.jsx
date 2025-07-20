import React, { use, useEffect, useState } from 'react'

const Tasks = () => {
    const [date, setDate] = useState('');
    const [tasks, setTasks] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [dayRating, setDayRating] = useState('');
    const calcDayRating = (tasks) => {
        const completedTasks = tasks.filter(task => task.isCompleted);
        const totalTasks = tasks.length;
        if (totalTasks === 0) return;
        const completionRate = (completedTasks.length / totalTasks) * 100;
        let dayRating = '';
        if (completionRate === 100) {
            dayRating = 'Excellent';
        } else if (completionRate >= 75) {
            dayRating = 'Good';
        } else if (completionRate >= 50) {
            dayRating = 'Average';
        } else {
            dayRating = 'Poor';
        }
        setDayRating(dayRating);
        const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
        const idx = ratings.findIndex(r => r.date === date);
        if (idx !== -1) {
            ratings[idx].rating = dayRating;
        } else {
            ratings.push({ date: date, rating: dayRating });
        }
        localStorage.setItem('ratings', JSON.stringify(ratings));
    }
    const handleSubmit = () => {
        setTasks([]);
        setSubmitted(false);
        if (!date) {
            alert("Please select a date");
            return;
        }
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const filteredTasks = tasks.filter(task => task.date === date);
        if (filteredTasks.length === 0) {
            alert("No tasks found for the selected date");
            return;
        }
        setSubmitted(true);
        setTasks(filteredTasks);
        calcDayRating(filteredTasks);
        alert(`Tasks for ${date} are Ready!`);
    }
    const updateTasks = (updatedTasksForDate) => {
        const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newAllTasks = allTasks.map(task =>
            task.date === date
                ? updatedTasksForDate.find(t => t.id === task.id) || task
                : task
        );
        localStorage.setItem('tasks', JSON.stringify(newAllTasks));
        setTasks(updatedTasksForDate);
    }
    const updateTasksArray = (updatedTasks) => {
        const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newAllTasks = allTasks.filter(task => task.date !== date);
        localStorage.setItem('tasks', JSON.stringify([...newAllTasks, ...updatedTasks]));
        setTasks(updatedTasks);
    }

    useEffect(() => {
        if(!date){
            const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const today = new Date().toISOString().split('T')[0];
        const taskForToday = storedTasks.filter(task => task.date === today);
        
            setDate(today);
            setTasks(taskForToday);
            setSubmitted(true);
            calcDayRating(taskForToday);
        
        }
    }, [date]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 text-white">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-extrabold mb-6 text-blue-400 text-center">Tasks</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                    Enter date to view tasks:
                    <input
                        type="date"
                        className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter date to see Tasks"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
                {submitted && tasks.length > 0 && (
                    <h2 className="text-xl mt-4 mb-4 text-green-400 text-center">
                        Tasks for <span className="font-bold">{date}</span> <br />
                        <span className="text-base text-gray-300">Day Rating: <span className="font-semibold text-yellow-400">{dayRating}</span></span>
                    </h2>
                )}
                {submitted && tasks.length === 0 && date && (
                    <p className="text-center text-red-400">No tasks found for the selected date.</p>
                )}
                <ul className="space-y-4">
                    {tasks.map(task => (
                        <li key={task.id} className="bg-gray-800 rounded-lg shadow p-5 flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold mb-1">
                                    <span className="text-blue-400">Task:</span> {task.task}
                                </p>
                                <p className="mb-1">
                                    <span className="text-blue-400">Date:</span> {task.date}
                                </p>
                                <p className="mb-1 flex items-center gap-2">
                                    <span className="text-blue-400">Priority:</span>
                                    <span className={task.priority ? "text-red-400 font-bold" : "text-gray-300"}>{task.priority ? 'High' : 'Normal'}</span>
                                    <input
                                        type="checkbox"
                                        className="ml-2 accent-red-500"
                                        checked={task.priority}
                                        onChange={() => {
                                            const updatedTasks = tasks.map(t =>
                                                t.id === task.id ? { ...t, priority: !t.priority } : t
                                            );
                                            const sortedTasks = [...updatedTasks].sort((a, b) => b.priority - a.priority);
                                            setTasks(sortedTasks);
                                            updateTasks(sortedTasks);
                                        }}
                                    />
                                </p>
                                <p className="mb-1 flex items-center gap-2">
                                    <span className="text-blue-400">Status:</span>
                                    <span className={task.isCompleted ? "text-green-400 font-bold" : "text-yellow-400"}>{task.isCompleted ? 'Completed' : 'Pending'}</span>
                                    <input
                                        type="checkbox"
                                        className="ml-2 accent-green-500"
                                        checked={task.isCompleted}
                                        onChange={() => {
                                            const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t);
                                            setTasks(updatedTasks);
                                            calcDayRating(updatedTasks);
                                            updateTasks(updatedTasks);
                                        }}
                                    />
                                </p>
                            </div>
                            <button
                                className="mt-4 md:mt-0 md:ml-4 bg-blue-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition font-bold"
                                onClick={() => {
                                    const updatedTasks = tasks.filter(t => t.id !== task.id);
                                    setTasks(updatedTasks);
                                    updateTasksArray(updatedTasks);
                                    calcDayRating(updatedTasks);
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Tasks