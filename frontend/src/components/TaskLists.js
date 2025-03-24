import { useState, useEffect } from "react";
import { fetchTasks, deleteTask, updateTaskStatus } from "../api/tasks";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id)); // Optimistic update
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete task");
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "done" ? "todo" : "done";
    try {
      const updatedTask = await updateTaskStatus(task._id, newStatus);
      setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

return (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {tasks.map((task) => (
      <li 
        key={task._id} 
        style={{ 
          display: 'flex', 
          alignItems: 'center',
          margin: '8px 0',
          cursor: 'pointer'
        }}
      >
        <span
          onClick={() => handleToggleStatus(task)}
          style={{
            flex: 1,
            textDecoration: task.status === 'done' ? 'line-through' : 'none',
            color: task.status === 'done' ? '#888' : 
                   task.priority === 'high' ? '#ff4444' :
                   task.priority === 'medium' ? '#ffaa00' : '#00aa00'
          }}
        >
          {task.title}
        </span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(task._id);
          }}
          style={{
            marginLeft: '10px',
            background: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);
}

export default TaskList;