import '../App.css';
import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, deleteTask, updateTaskStatus, updateTask } from '../api/tasks';
import { FaTrash, FaEdit } from 'react-icons/fa';
import TaskForm from './TaskForm'; 

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

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

  const handleEditClick = (task) => {
    setEditingTask({ ...task });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = await updateTask(editingTask._id, editingTask);
      setTasks((prevTasks) => prevTasks.map(t => t._id === updatedTask._id ? updatedTask : t));
      setEditingTask(null);
    } catch (error) {
      handleError(error, 'Failed to update task');
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
    <div>
      <TaskForm onTaskCreated={loadTasks} />

      {editingTask && (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            name="title"
            value={editingTask.title}
            onChange={handleEditChange}
            required
          />
          <input
            type="date"
            name="dueDate"
            value={editingTask.dueDate?.split('T')[0] || ''}
            onChange={handleEditChange}
          />
          <select
            name="priority"
            value={editingTask.priority}
            onChange={handleEditChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit">Update Task</button>
          <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>
        </form>
      )}
      <ul className="task-list">
        {tasks.map((task) => {
          const priorityClass = task.priority === 'high' ? 'high' : task.priority === 'medium' ? 'medium' : 'low';
          const dateClass = !task.dueDate ? 'no-date' : new Date(task.dueDate) < new Date() ? 'past-due' : task.isUrgent ? 'urgent' : '';

          return (
            <li key={task._id} className={`task-item ${priorityClass}`} onClick={() => handleToggleStatus(task)}>
              <span className={`task-title ${task.status}`}>{task.title}</span>
              <span className={`task-date ${dateClass}`}>{formatDate(task.dueDate)}</span>
              <button onClick={(e) => { e.stopPropagation(); handleEditClick(task); }} className="edit-btn" aria-label="Edit task">
                <FaEdit />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(task._id); }} className="delete-btn" aria-label="Delete task">
                <FaTrash />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TaskList;
