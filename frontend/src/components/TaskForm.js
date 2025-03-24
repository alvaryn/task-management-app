import { useState } from 'react';
import { createTask } from '../api/tasks';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState("medium"); // Default state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask({ title, priority });
      onTaskCreated(newTask);
      setTitle('');
    } catch (error) {
      alert(`Error: ${error.message}`); // User-friendly error
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <select 
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>      
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
