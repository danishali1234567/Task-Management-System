
import React from "react";
import {
  ListTodo,
  Clock3,
  CircleCheck,
  Bell,
  Plus
} from "lucide-react";

import StatCard from "../components/StatCard";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";

function Dashboard({
  tasks,
  stats,
  onAdd,
  onEdit,
  onDelete,
  onStatus
}) {
  const { user } = useAuth();

  const percentage = stats.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  return (
    <>
      <div className="welcome-row">
        <div>
          <span className="eyebrow">OVERVIEW</span>
          <h1>
            Good morning, {user?.name?.split(" ")[0]}! 👋
          </h1>
          <p>Here's what's happening with your workspace today.</p>
        </div>

        <button className="primary-btn" onClick={onAdd}>
          <Plus size={18} /> Add New Task
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={ListTodo}
          color="blue"
        />

        <StatCard
          title="In Progress"
          value={stats.progress}
          icon={Clock3}
          color="orange"
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CircleCheck}
          color="green"
        />

        <StatCard
          title="High Priority"
          value={stats.highPriority}
          icon={Bell}
          color="purple"
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel task-panel">
          <div className="panel-heading">
            <div>
              <h3>Recent Tasks</h3>
              <p>Your latest tasks and updates</p>
            </div>
          </div>

          {tasks.length === 0 ? (
            <EmptyState onAdd={onAdd} />
          ) : (
            tasks.slice(0, 6).map((task) => (
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

        <section className="panel progress-panel">
          <div className="panel-heading">
            <div>
              <h3>Task Progress</h3>
              <p>Your productivity overview</p>
            </div>
          </div>

          <div
            className="progress-circle"
            style={{ "--progress": `${percentage * 3.6}deg` }}
          >
            <div>
              <strong>{percentage}%</strong>
              <span>Completed</span>
            </div>
          </div>

          <div className="progress-details">
            <div>
              <span className="dot green-dot"></span>
              Completed
              <strong>{stats.completed}</strong>
            </div>

            <div>
              <span className="dot orange-dot"></span>
              In Progress
              <strong>{stats.progress}</strong>
            </div>

            <div>
              <span className="dot gray-dot"></span>
              To Do
              <strong>{stats.pending}</strong>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
