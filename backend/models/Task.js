const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  isUrgent: {  type: Boolean, default: false },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
}, { timestamps: true });

taskSchema.pre('save', function(next) {
  if (this.dueDate) {
    const daysUntilDue = Math.floor(
      (new Date(this.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    this.isUrgent = daysUntilDue <= 2; // Mark as urgent if due in 2 days or less
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);