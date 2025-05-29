const moment = require("moment/moment");
const Task = require("../models/taskModel");
const getLocationName = require("../helpers/getLocationName");

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById({ _id: id });

    if (!task) {
      return res.status(200).json({
        message: "Task not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Task fetched through id",
      data: task,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const allTask = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "fetched all Task",
      data: allTask,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category, location, status } =
      req.body;

    // console.log("Original dueDate from req.body:", dueDate, typeof dueDate);
    const taskDate = moment(dueDate, "YYYY-MM-DD").format("YYYY-MM-DD");

    console.log("taskDate: ", taskDate);
    const existingTask = await Task.findOne({
      category,
      dueDate: {
        $gte: new Date(`${taskDate}T00:00:00.000Z`),
        $lte: new Date(`${taskDate}T23:59:59.999Z`),
      },
    });

    if (existingTask) {
      return res.status(200).json({
        message: `A task with category "${category}" already exists on ${taskDate}.`,
        error: true,
        success: false,
      });
    }

    const newTask = new Task({
      title,
      description,
      dueDate: new Date(dueDate),
      category,
      location,
      status,
    });

    const saveTask = await newTask.save();

    return res.status(200).json({
      message: "Task created successfully.",
      data: saveTask,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { _id, title, description, dueDate, category, location, status } =
      req.body;

    // console.log("_id: ", _id);
    console.log("location: ", location);

    const locationName = await getLocationName(location.lat, location.lng);

    const payload = {
      _id,
      title,
      description,
      dueDate: new Date(dueDate),
      category,
      location: {
        ...location,
        name: locationName,
      },

      status,
    };

    const updatedTask = await Task.findByIdAndUpdate(_id, payload, {
      new: true,
    });
    res.status(200).json({
      message: "Task updated successfully.",
      data: updatedTask,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    // const taskId = req.body.id;
    // console.log("_id: ", taskId);
    // console.log("req.body: ", taskId);
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully.",
      data: deletedTask,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
