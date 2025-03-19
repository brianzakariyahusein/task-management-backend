const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", verifyToken, getTasks);
router.get("/:id", verifyToken, getTaskById);
router.post("/", verifyToken, createTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

module.exports = router;
