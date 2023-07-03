// Tasks.js
import React, { useState } from "react";

const Tasks = ({ projectId, addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    if (taskName.trim() !== "" && !isNaN(timeSpent) && timeSpent > 0) {
      addTask(projectId, taskName.trim(), parseFloat(timeSpent), description);
      setTaskName("");
      setTimeSpent("");
      setDescription("");
    }
  };

  return (
    <div>
      <h3>Tasks for Project {projectId}</h3>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
      />
      <input
        type="text"
        value={timeSpent}
        onChange={(e) => setTimeSpent(e.target.value)}
        placeholder="Time Spent (in hours)"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default Tasks;
