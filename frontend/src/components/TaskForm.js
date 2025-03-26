import { useState } from 'react';
import { createTask } from '../api/tasks';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    dueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask({
        ...formData,
        dueDate: formData.dueDate || null,
      });
      onTaskCreated(newTask);
      setFormData({ title: '', priority: 'medium', dueDate: '' });
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form" style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h2 className="form-title" style={{ textAlign: 'center' }}>📝 Add a New Task</h2>
      
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="form-label">Task Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title..."
          className="form-input title-input"
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="form-label">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className="form-input date-input"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="form-label">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="form-input priority-select"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        style={{
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '10px'
        }}
      >
        ➕ Add Task
      </button>
    </form>
  );
};

export default TaskForm;