const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /tasks
// @access  Public
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTasksByStatus = async (req, res) => {
  const tasks = await Task.find({ status: req.params.status });
  res.json(tasks);
};

// @desc    Create a task
// @route   POST /tasks
// @access  Public
const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  try {
    const task = await Task.create({ title, description, dueDate, priority });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true } // Return the updated task
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, updateTaskStatus };