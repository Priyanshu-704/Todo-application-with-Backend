const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
const protect = require("../middleware/auth");

//task added
router.post("/addtask", protect, async (req, res) => {
  try {
    const { title, description, id, dueDate } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({
        title,
        description,
        dueDate,
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


module.exports = router;
