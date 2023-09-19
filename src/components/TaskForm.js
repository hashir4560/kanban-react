import React, { useState } from "react";
import '../styles/TaskForm.css';
const TaskForm = ({ addTask }) => {
  const [taskContent, setTaskContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskContent.trim() === "") {
      return;
    }
    addTask(taskContent);
    setTaskContent("");
  };

  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task content"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
