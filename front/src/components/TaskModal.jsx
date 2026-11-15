
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  status: "Todo",
  priority: "Medium",
  category: "General",
  project: "Personal",
  dueDate: ""
};

function TaskModal({ task, onClose, onSave }) {
  const [form, setForm] = useState(initialForm);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "Todo",
        priority: task.priority || "Medium",
        category: task.category || "General",
        project: task.project || "Personal",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().slice(0, 10)
          : ""
      });
    } else {
      setForm(initialForm);
    }
  }, [task]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      await onSave({
        ...form,
        dueDate: form.dueDate || null
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to save task"
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <form className="task-modal" onSubmit={handleSubmit}>
        <div className="modal-heading">
          <div>
            <h2>{task ? "Edit Task" : "Create New Task"}</h2>
            <p>Enter your task information below.</p>
          </div>

          <button type="button" className="icon-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <label>
          Task Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your task..."
            rows="3"
          />
        </label>

        <div className="form-grid">
          <label>
            Status
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Todo</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </label>

          <label>
            Priority
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>

          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              <option>General</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Study</option>
              <option>Development</option>
              <option>Design</option>
            </select>
          </label>

          <label>
            Project
            <input
              name="project"
              value={form.project}
              onChange={handleChange}
              placeholder="Project name"
            />
          </label>
        </div>

        <label>
          Due Date
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
        </label>

        {error && <div className="error-message">{error}</div>}

        <div className="modal-actions">
          <button type="button" className="secondary-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="primary-btn" disabled={busy}>
            {busy ? "Saving..." : task ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskModal;
