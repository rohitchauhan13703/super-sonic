import React, { useEffect, useState } from "react";
import { createTask, updateTask } from "../services/api";

const TaskForm = ({ fetchTasks, editTask, setEditTask }) => {
  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    if (editTask) setTask(editTask);
  }, [editTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTask) {
        await updateTask(editTask._id, task);
        setEditTask(null);
      } else {
        await createTask(task);
      }
      setTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Enter task title..."
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Enter task description..."
        required
      />
      <button type="submit">{editTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
