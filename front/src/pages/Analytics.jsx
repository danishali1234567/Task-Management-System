
import React from "react";

function Analytics({ stats }) {
  const percentage = stats.total
    ? Math.round(stats.completed / stats.total * 100)
    : 0;

  const items = [
    {
      label: "Completed",
      value: stats.completed,
      color: "green"
    },
    {
      label: "In Progress",
      value: stats.progress,
      color: "orange"
    },
    {
      label: "To Do",
      value: stats.pending,
      color: "blue"
    }
  ];

  return (
    <>
      <div className="welcome-row">
        <div>
          <span className="eyebrow">INSIGHTS</span>
          <h1>Analytics</h1>
          <p>Track your productivity and performance.</p>
        </div>
      </div>

      <div className="stats-grid analytics-stats">
        <div className="stat-card">
          <span>Total Tasks</span>
          <strong>{stats.total}</strong>
          <small>All created tasks</small>
        </div>

        <div className="stat-card">
          <span>Completion Rate</span>
          <strong>{percentage}%</strong>
          <small>Tasks completed</small>
        </div>

        <div className="stat-card">
          <span>High Priority</span>
          <strong>{stats.highPriority}</strong>
          <small>Unfinished tasks</small>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>{stats.completed}</strong>
          <small>Finished tasks</small>
        </div>
      </div>

      <section className="panel analytics-panel">
        <h3>Task Distribution</h3>

        {items.map((item) => (
          <div className="analytics-item" key={item.label}>
            <div>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>

            <div className="analytics-track">
              <span
                className={item.color}
                style={{
                  width: `${
                    stats.total
                      ? item.value / stats.total * 100
                      : 0
                  }%`
                }}
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Analytics;
