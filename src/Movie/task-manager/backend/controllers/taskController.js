const Task = require("../models/Task");
const asyncHandler = require("../middleware/asyncHandler");

// @desc Get all tasks
// @route GET /api/tasks
// @access Public
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

// @desc Create new task
// @route POST /api/tasks
// @access Public
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("Please provide both title and description");
  }

  const task = await Task.create({ title, description, status });
  res.status(201).json(task);
});

// @desc Update task (full update)
// @route PUT /api/tasks/:id
// @access Public
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedTask);
});

// @desc Partially update task (PATCH)
// @route PATCH /api/tasks/:id
// @access Public
const patchTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Update only provided fields
  Object.keys(req.body).forEach((key) => {
    task[key] = req.body[key];
  });

  const updatedTask = await task.save();
  res.status(200).json(updatedTask);
});

// @desc Delete task
// @route DELETE /api/tasks/:id
// @access Public
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await Task.findByIdAndDelete(id);
  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  patchTask,
  deleteTask,
};
