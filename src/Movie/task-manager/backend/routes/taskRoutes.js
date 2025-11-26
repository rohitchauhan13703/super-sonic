const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  patchTask,
  deleteTask,
} = require("../controllers/taskController");

// Routes
router.route("/").get(getTasks).post(createTask);
router.route("/:id").put(updateTask).patch(patchTask).delete(deleteTask);

module.exports = router;
