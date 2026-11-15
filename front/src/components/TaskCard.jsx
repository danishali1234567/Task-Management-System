
import React from "react";
import {
  Pencil,
  Trash2,
  CircleCheck
} from "lucide-react";

function TaskCard({ task, onEdit, onDelete, onStatus }) {
  return (
    <div className="task-row">
      <button
        className={`task-check ${
          task.status === "Completed" ? "checked" : ""
        }`}
        onClick={() => onStatus(task)}
        title="Change task status"
      >
        {task.status === "Completed" && <CircleCheck size={16} />}
      </button>

      <div className="task-row-info">
        <strong className={
          task.status === "Completed" ? "completed-title" : ""
        }>
          {task.title}
        </strong>

        <span>
          {task.category} · {task.project}
        </span>
      </div>

      <span className={`priority-badge ${task.priority.toLowerCase()}`}>
        {task.priority}
      </span>

      <span className={`status-badge ${
        task.status.toLowerCase().replace(" ", "-")
      }`}>
        {task.status}
      </span>

      <span className="task-date">
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString("en-IN")
          : "No deadline"}
      </span>

      <div className="task-actions">
        <button onClick={() => onEdit(task)} title="Edit">
          <Pencil size={16} />
        </button>

        <button onClick={() => onDelete(task._id)} title="Delete">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
