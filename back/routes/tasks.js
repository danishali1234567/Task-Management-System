const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

// Get all tasks + Search + Filters
router.get("/", async (req, res) => {
  try {
    const { search, status, priority, category } = req.query;

    const filter = { user: req.user.id };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    const tasks = await Task.find(filter).sort({
      createdAt: -1
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dashboard statistics
router.get("/stats", async (req, res) => {
  try {
    const userId = req.user.id;

    const [total, completed, pending, progress, highPriority] =
      await Promise.all([
        Task.countDocuments({ user: userId }),
        Task.countDocuments({ user: userId, status: "Completed" }),
        Task.countDocuments({ user: userId, status: "Todo" }),
        Task.countDocuments({ user: userId, status: "In Progress" }),
        Task.countDocuments({
          user: userId,
          priority: "High",
          status: { $ne: "Completed" }
        })
      ]);

    res.json({
      total,
      completed,
      pending,
      progress,
      highPriority
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;