// Projects.js
import React, { useState } from "react";

const Projects = ({ addProject }) => {
  const [projectName, setProjectName] = useState("");

  const handleAddProject = () => {
    if (projectName.trim() !== "") {
      addProject(projectName.trim());
      setProjectName("");
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={handleAddProject}>Add Project</button>
    </div>
  );
};

export default Projects;
