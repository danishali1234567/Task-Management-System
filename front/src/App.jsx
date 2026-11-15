
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import TaskModal from "./components/TaskModal";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

import api from "./api/api";

function Layout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        open={sidebarOpen}
        close={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <Navbar
          toggleSidebar={() => setSidebarOpen(true)}
        />

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    progress: 0,
    highPriority: 0
  });

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  const loadData = async () => {
    try {
      const [taskRes, statRes] = await Promise.all([
        api.get("/tasks"),
        api.get("/tasks/stats")
      ]);

      setTasks(taskRes.data);
      setStats(statRes.data);
    } catch (error) {
      console.error("Task loading failed:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setModal(true);
  };

  const openEdit = (task) => {
    setEditing(task);
    setModal(true);
  };

  const saveTask = async (data) => {
    if (editing) {
      await api.put(`/tasks/${editing._id}`, data);
    } else {
      await api.post("/tasks", data);
    }

    setModal(false);
    setEditing(null);
    await loadData();
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      await loadData();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const changeStatus = async (task) => {
    const nextStatus =
      task.status === "Todo"
        ? "In Progress"
        : task.status === "In Progress"
        ? "Completed"
        : "Todo";

    try {
      await api.put(`/tasks/${task._id}`, {
        status: nextStatus
      });

      await loadData();
    } catch (error) {
      alert("Unable to update task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      `${task.title} ${task.description}`
        .toLowerCase()
        .includes(query.toLowerCase());

    const matchesStatus = !status || task.status === status;
    const matchesPriority = !priority || task.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route
            path="/"
            element={
              <Dashboard
                user={user}
                tasks={tasks}
                stats={stats}
                onAdd={openAdd}
                onEdit={openEdit}
                onDelete={deleteTask}
                onStatus={changeStatus}
              />
            }
          />

          <Route
            path="/tasks"
            element={
              <Tasks
                tasks={filteredTasks}
                query={query}
                setQuery={setQuery}
                status={status}
                setStatus={setStatus}
                priority={priority}
                setPriority={setPriority}
                onAdd={openAdd}
                onEdit={openEdit}
                onDelete={deleteTask}
                onStatus={changeStatus}
              />
            }
          />

          <Route
            path="/projects"
            element={<Projects tasks={tasks} />}
          />

          <Route
            path="/analytics"
            element={<Analytics stats={stats} />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {modal && (
        <TaskModal
          task={editing}
          onClose={() => {
            setModal(false);
            setEditing(null);
          }}
          onSave={saveTask}
        />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <TaskApp />
    </AuthProvider>
  );
}

export default App;
