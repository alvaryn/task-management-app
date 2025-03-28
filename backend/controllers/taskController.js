const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /tasks
// @access  Public
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
  }
};

// @desc    Get tasks by status
// @route   GET /tasks/status/:status
// @access  Public
const getTasksByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const tasks = await Task.find({ status });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks by status', details: err.message });
  }
};

// @desc    Create a new task
// @route   POST /tasks
// @access  Public
const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  if (!title || !priority) {
    return res.status(400).json({ error: 'Title and priority are required' });
  }

  try {
    const task = await Task.create({ title, description, dueDate, priority });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task', details: err.message });
  }
};

// @desc    Update a task
// @route   PUT /tasks/:id
// @access  Public
const updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
};

// @desc    Update task status
// @route   PATCH /tasks/:id/status
// @access  Public
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['todo', 'in-progress', 'done'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task status', details: err.message });
  }
};

// @desc    Delete a task
// @route   DELETE /tasks/:id
// @access  Public
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task', details: err.message });
  }
};

module.exports = {
  getTasks,
  getTasksByStatus,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};