import '../App.css';
import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, deleteTask, updateTaskStatus } from '../api/tasks';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleError = (error, message) => {
    console.error(message, error);
    alert(message);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      handleError(error, 'Failed to delete task');
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    try {
      const updatedTask = await updateTaskStatus(task._id, newStatus);
      setTasks((prevTasks) => prevTasks.map(t => t._id === updatedTask._id ? updatedTask : t));
    } catch (error) {
      handleError(error, 'Failed to update status');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    if (date.getFullYear() !== new Date().getFullYear()) options.year = 'numeric';
    return date.toLocaleDateString('en-US', options);
  };

  if (loading) return <div>Loading tasks...</div>;

  return (
    <ul className="task-list">
      {tasks.map((task) => {
        const priorityClass = task.priority === 'high' ? 'high' : task.priority === 'medium' ? 'medium' : 'low';
        const dateClass = !task.dueDate ? 'no-date' : new Date(task.dueDate) < new Date() ? 'past-due' : task.isUrgent ? 'urgent' : '';

        return (
          <li key={task._id} className={`task-item ${priorityClass}`} onClick={() => handleToggleStatus(task)}>
            <span className={`task-title ${task.status}`}>{task.title}</span>
            <span className={`task-date ${dateClass}`}>{formatDate(task.dueDate)}</span>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                handleDelete(task._id); 
              }} 
              className="delete-btn"
              aria-label="Delete task"
            >
              <FaTrash />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default TaskList;