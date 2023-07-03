import React, { useState } from "react";

function Form() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim() !== "") {
      setProjects([...projects, projectName]);
      setProjectName("");
    }
  };

  return (
    <div>
      <h1>Project Tracker</h1>
      <form onSubmit={handleProjectSubmit}>
        <input
          type="text"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button type="submit">Add Project</button>
      </form>
      <h2>Projects:</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>{project}</li>
        ))}
      </ul>
    </div>
  );
}

export default Form;
