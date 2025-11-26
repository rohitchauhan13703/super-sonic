import React from "react";
import { deleteTask, patchTask } from "../services/api";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, fetchTasks, setEditTask }) => {
  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    await patchTask(task._id, { status: newStatus });
    fetchTasks();
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="empty">No tasks yet 😴</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            handleDelete={handleDelete}
            handleToggleStatus={handleToggleStatus}
            setEditTask={setEditTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
