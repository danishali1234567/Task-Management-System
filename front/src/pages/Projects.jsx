
import React from "react";
import { FolderKanban } from "lucide-react";

function Projects({ tasks }) {
  const projects = [...new Set(
    tasks.map((task) => task.project || "Personal")
  )];

  return (
    <>
      <div className="welcome-row">
        <div>
          <span className="eyebrow">ORGANIZATION</span>
          <h1>My Projects</h1>
          <p>Organize all your work into projects.</p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="panel empty-state">
          <FolderKanban size={35} />
          <h3>No projects yet</h3>
          <p>Create a task and assign a project name.</p>
        </div>
      ) : (
        <div className="project-grid">
          {projects.map((project, index) => {
            const projectTasks = tasks.filter(
              (task) => (task.project || "Personal") === project
            );

            const completed = projectTasks.filter(
              (task) => task.status === "Completed"
            ).length;

            const percentage = Math.round(
              completed / projectTasks.length * 100
            );

            return (
              <div className="project-card" key={project}>
                <div className={`project-icon project-color-${index % 4}`}>
                  <FolderKanban size={22} />
                </div>

                <h3>{project}</h3>

                <p>
                  {projectTasks.length} Tasks · {completed} Completed
                </p>

                <div className="mini-progress">
                  <span style={{ width: `${percentage}%` }} />
                </div>

                <small>{percentage}% Completed</small>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Projects;
