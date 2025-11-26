import React from "react";

const TaskCard = ({ task, handleDelete, handleToggleStatus, setEditTask }) => {
  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-info">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span className={`status ${task.status}`}>
          {task.status.toUpperCase()}
        </span>
      </div>

      <div className="task-actions">
        <button onClick={() => handleToggleStatus(task)}>
          {task.status === "completed" ? "↩ Undo" : "✅ Complete"}
        </button>
        <button onClick={() => setEditTask(task)}>✏ Edit</button>
        <button onClick={() => handleDelete(task._id)}>🗑 Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
