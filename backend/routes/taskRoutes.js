const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, updateTaskStatus } = require('../controllers/taskController');

const router = express.Router();

router.route('/').get(getTasks).post(createTask);
router.route('/:id').put(updateTask).delete(deleteTask);
router.route('/:id').delete(deleteTask); 
router.patch('/:id/status', updateTaskStatus); // PATCH is ideal for partial updates

module.exports = router;