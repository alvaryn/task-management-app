import { useState } from 'react';
import { createTask } from '../api/tasks';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask({ title });
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
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
