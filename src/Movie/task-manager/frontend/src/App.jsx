import React, { useEffect, useState } from "react";
import { getTasks } from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      <h1 className="heading">📝 Smart Task Manager</h1>
      <p className="sub">Manage your goals efficiently ✨</p>

      <TaskForm fetchTasks={fetchTasks} editTask={editTask} setEditTask={setEditTask} />
      <TaskList fetchTasks={fetchTasks} tasks={tasks} setEditTask={setEditTask} />
    </div>
  );
}

export default App;
