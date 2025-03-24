import logo from './logo.png';
import './App.css';
import React, { useState } from 'react'; 
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskLists';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://pornhub.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           get freaky
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  const [tasks, setTasks] = useState([]);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList tasks={tasks} />
    </div>
    
  );
}

export default App;
