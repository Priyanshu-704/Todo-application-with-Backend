const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
const protect = require("../middleware/auth");

//task added
router.post("/addtask", protect, async (req, res) => {
  try {
    const { title, description, id, dueDate, priority } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({
        title,
        description,
        dueDate,
        priority,
        user: existingUser,
      });
      await list.save().then(() => {
        res.status(200).json({ list });
      });
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

//update task
router.put("/updatetask/:id", protect, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, {
      title,
      description,
      dueDate,
    });
    if (!list) {
      return res.status(400).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
  }
});

//delete Task
router.delete("/deletetask/:id", protect, async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({ message: "Task deleted successfully" });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//get Task
router.get("/gettask/:id", protect, async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if (list.length !== 0) {
      res.status(200).json({ list: list });
    } else {
      res.status(200).json({ message: "No tasks found" });
    }
  } catch (error) {
    console.log(error);
  }
});

//update completion status
router.put("/togglecomplete/:taskId", protect, async (req, res) => {
  try {
    const task = await List.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

//task auto suggestions
router.get("/task-suggestions", protect, async (req, res) => {
  try {
    const allTasks = await List.find({ user: req.user.id, isCompleted: false });

    // Get today's date range (start and end)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Filter only tasks due today
    const todaysTasks = allTasks.filter((task) => {
      const due = new Date(task.dueDate);
      return due >= startOfToday && due <= endOfToday;
    });

    // Sort by priority and dueDate
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };

    const sortedTasks = todaysTasks.sort((a, b) => {
      const priorityCompare =
        priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityCompare !== 0) return priorityCompare;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    res.json({ suggestions: sortedTasks });
  } catch (error) {
    console.error("Suggestion error:", error);
    res.status(500).json({ message: "Server error while suggesting tasks." });
  }
});



module.exports = router;
