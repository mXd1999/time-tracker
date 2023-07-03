import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

function App() {
  const [projects, setProjects] = useState([]);
  const [projectIdCounter, setProjectIdCounter] = useState(0);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [description, setDescription] = useState("");
  const [currentProjectId, setCurrentProjectId] = useState(null);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    setProjects(storedProjects || []);
    setProjectIdCounter(storedProjects ? storedProjects.length : 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = () => {
    setShowProjectModal(true);
  };

  const handleProjectModalSubmit = () => {
    if (projectName.trim() !== "") {
      const newProject = {
        id: projectIdCounter,
        name: projectName.trim(),
        tasks: [],
      };
      setProjects([...projects, newProject]);
      setProjectIdCounter(projectIdCounter + 1);
      setProjectName("");
      setShowProjectModal(false);
    }
  };

  const handleAddTask = (projectId) => {
    setShowTaskModal(true);
    setCurrentProjectId(projectId);
  };

  const handleTaskModalSubmit = () => {
    if (taskName.trim() !== "" && !isNaN(timeSpent) && timeSpent > 0) {
      const newTask = {
        taskName: taskName.trim(),
        timeSpent: parseFloat(timeSpent),
        description,
      };
      const updatedProjects = projects.map((project) => {
        if (project.id === currentProjectId) {
          return {
            ...project,
            tasks: [...project.tasks, newTask],
          };
        }
        return project;
      });
      setProjects(updatedProjects);
      setTaskName("");
      setTimeSpent("");
      setDescription("");
      setShowTaskModal(false);
    }
  };

  const getTotalTimeSpent = (tasks) => {
    return tasks.reduce((total, task) => total + task.timeSpent, 0);
  };

  return (
    <div className="container">
      <h1 className="my-4">Time Tracking App</h1>
      <Button variant="primary" className="mb-4" onClick={handleAddProject}>
        Add Project
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Tasks</th>
            <th>Time Spent on Tasks</th>
            <th>Total Hours Spent in a Day</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="4">No projects available</td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleAddTask(project.id)}
                  >
                    {project.name}
                  </Button>
                </td>
                <td>
                  <ul>
                    {project.tasks.map((task, index) => (
                      <li key={index}>
                        <strong>{task.taskName}</strong>
                        <br />
                        Time Spent: {task.timeSpent} hours
                        <br />
                        Description: {task.description}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{getTotalTimeSpent(project.tasks)} hours</td>
                <td>{getTotalTimeSpent(project.tasks)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add Project Modal */}
      <Modal show={showProjectModal} onHide={() => setShowProjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="projectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowProjectModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleProjectModalSubmit}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Task Modal */}
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="timeSpent">
              <Form.Label>Time Spent (in hours)</Form.Label>
              <Form.Control
                type="number"
                value={timeSpent}
                onChange={(e) => setTimeSpent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTaskModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleTaskModalSubmit}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
