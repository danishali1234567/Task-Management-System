
import React from "react";
import { Search, Plus } from "lucide-react";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";

function Tasks({
  tasks,
  query,
  setQuery,
  status,
  setStatus,
  priority,
  setPriority,
  onAdd,
  onEdit,
  onDelete,
  onStatus
}) {
  return (
    <>
      <div className="welcome-row">
        <div>
          <span className="eyebrow">WORKSPACE</span>
          <h1>My Tasks</h1>
          <p>Manage, organize and track all your tasks.</p>
        </div>

        <button className="primary-btn" onClick={onAdd}>
          <Plus size={18} /> Add Task
        </button>
      </div>

      <section className="panel">
        <div className="filters">
          <div className="search-box">
            <Search size={18} />
            <input
              placeholder="Search tasks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        {tasks.length === 0 ? (
          <EmptyState message="No matching tasks found" onAdd={onAdd} />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatus={onStatus}
            />
          ))
        )}
      </section>
    </>
  );
}

export default Tasks;
