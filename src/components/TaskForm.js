import React, { useState } from "react";
import '../styles/TaskForm.css';

const TaskForm = ({ addTask }) => {
  const [taskContent, setTaskContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskContent.trim() === "") {
      setError("Field cannot be empty");
      return;
    }

    addTask(taskContent);
    setTaskContent("");
    setError("");
  };

  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task content"
          value={taskContent}
          onChange={(e) => {
            setTaskContent(e.target.value);
            setError("");
          }}
        />
        <button type="submit">Add Task</button>
      </form>
      {error && <p className="error-text">{error}</p>} {/* Apply CSS class for error text */}
    </div>
  );
};

export default TaskForm;
