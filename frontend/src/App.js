import logo from './logo.png';
import './App.css';
import React, { useState } from 'react'; 
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskLists';

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <img src={logo} alt="Logo" className="logo" />
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="mode-toggle"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>
      
      <main>
        <TaskForm onTaskCreated={handleTaskCreated} />
        <TaskList tasks={tasks} />
      </main>
    </div>
  );
}

export default App;