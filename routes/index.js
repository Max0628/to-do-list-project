var express = require("express");
var router = express.Router();

//將http request發出的JSON格式換成Javascript的Object
router.use(express.json());

let tasks = [];

//POST，新增
router.post("/add", (req, res) => {
  const newTask = req.body;

  //如果http request的body存在且存在id的屬性
  if (newTask && newTask.id) {
    tasks.push(newTask);
    res.json({ message: "任務加入成功", task: newTask });
    console.log({ message: "任務加入成功", task: newTask });
  } else {
    res.status(400).json({ error: "任務沒有id屬性" });
  }
});

// DELETE 刪除
router.delete("/delete/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  if (isNaN(taskId)) {
    return res.status(400).json({ error: "任務id無效" });
  }
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex > -1) {
    const taskText = tasks[taskIndex].text;
    tasks.splice(taskIndex, 1);
    res.json({ message: "任務刪除成功", taskId: taskId, text: taskText });
    console.log({ message: "任務刪除成功", taskId: taskId, text: taskText });
  } else {
    res.status(404).json({ error: "無相同任務與此ID匹配" });
  }
});

module.exports = router;
