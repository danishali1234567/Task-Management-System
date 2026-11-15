
import React from "react";

function StatCard({ title, value, icon: Icon, color, subtitle }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        <Icon size={21} />
      </div>

      <span>{title}</span>
      <strong>{value}</strong>
      <small>{subtitle || "In your workspace"}</small>
    </div>
  );
}

export default StatCard;
