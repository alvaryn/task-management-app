require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
// Error handling
app.use(errorHandler);

//helps with comms b/w frondend and backend over diff ports
const cors = require('cors'); 
app.use(cors()); 

// Routes
app.get('/', (req, res) => {
  res.send('Task Management API');
});
app.use('/tasks', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});