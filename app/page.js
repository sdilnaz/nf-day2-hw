'use client'
import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState(() => {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [count, setCount] = useState(0);

  
  const calculateUncompletedTasks = (tasks) => {
    return tasks.filter(task => !task.completed).length;
  };

  
  useEffect(() => {
    setCount(calculateUncompletedTasks(tasks));
  }, []);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setCount(calculateUncompletedTasks(tasks));
  }, [tasks]);


  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks(oldTasks => [...oldTasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  const handleToggleTask = (index) => {
    setTasks(oldTasks =>
      oldTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (index) => {
    setTasks(prevTasks => prevTasks.filter((task, i) => i !== index));
  };


  const filteredTasks = () => {
    if (filter === 'active') {
      return tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    } else {
      return tasks;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={newTask}
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do?"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        <TaskList 
          tasks={filteredTasks()} 
          handleToggleTask={handleToggleTask} 
          handleDeleteTask={handleDeleteTask} 
        />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{count} items left</span>
          <div>
            <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={() => {
              setTasks(prevTasks => prevTasks.filter(task => !task.completed));
            }}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
