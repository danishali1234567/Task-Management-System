
import React from "react";
import { CheckSquare, Plus } from "lucide-react";

function EmptyState({ onAdd, message = "No tasks found" }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <CheckSquare size={32} />
      </div>

      <h3>{message}</h3>

      <p>Create your first task and start being productive.</p>

      {onAdd && (
        <button className="primary-btn" onClick={onAdd}>
          <Plus size={17} /> Create Task
        </button>
      )}
    </div>
  );
}

export default EmptyState;
