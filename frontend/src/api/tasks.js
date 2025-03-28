const API_BASE_URL = "http://localhost:5001"; // Match your backend port

// Fetch all tasks
export const fetchTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error("Failed to create task");
  return response.json();
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete task");
  return response.json(); // Returns { message: "Task deleted successfully" }
};

// Update a task
export const updateTask = async (id, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error("Failed to update task");
  return response.json();
};

// Update task status
export const updateTaskStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update status");
  return response.json();
};
