const Task = require("../models/Task");

// GET semua task
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil task!" });
  }
};
// GET berdasarkan id
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId }); // Pastikan user hanya bisa akses task-nya sendiri
    if (!task) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error saat mengambil task:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// POST buat task baru
const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      userId: req.userId,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // Hanya update task milik user
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task tidak ditemukan atau tidak memiliki akses" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// DELETE task
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId }); // Hanya hapus task milik user
    if (!deletedTask) {
      return res.status(404).json({ message: "Task tidak ditemukan atau tidak memiliki akses" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
