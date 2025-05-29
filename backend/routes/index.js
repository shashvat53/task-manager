const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");
const router = express.Router();

router.post("/create-task", createTask);
router.get("/get-all-task", getTasks);
router.get("/get-id-task/:id", getTaskById);
router.post("/update-task", updateTask);
router.delete("/delete-task/:id", deleteTask);

module.exports = router;
