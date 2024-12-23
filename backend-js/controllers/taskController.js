const Task = require('../models/taskModel');

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, dueTime, priority, reminders } = req.body;

    if (!title || !dueDate || !dueTime) {
      return res.status(400).json({ message: 'Title, dueDate, and dueTime are required.' });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      dueTime,
      priority,
      reminders,
      user: req.user.id,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, dueDate, dueTime, priority, reminders, completed } = req.body;

    const task = await Task.findById(taskId);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.dueTime = dueTime || task.dueTime;
    task.priority = priority || task.priority;
    task.reminders = reminders || task.reminders;
    task.completed = completed ?? task.completed;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    await task.remove();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
