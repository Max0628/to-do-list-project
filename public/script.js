const tasks = [];

document.querySelector("#add-btn").addEventListener("click", () => {
  addTask();
});

async function addTask() {
  const newTaskInput = document.querySelector("#new-task");
  const taskText = newTaskInput.value.trim();
  if (taskText !== "") {
    //設定id為Unix時間開始(19701月1日00:00:00)到現在的豪秒數
    const taskId = new Date().getTime();
    tasks.push({ id: taskId, text: taskText });
    newTaskInput.value = "";
    try {
      //  發出http POST request
      const response = await fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId, text: taskText }),
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
    render();
  }
}

async function deleteTask(taskId) {
  //設定Tasks array中的元素有符合taskId者為taskIndex
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  //如果陣列中存有該元素,也就是index可能是0,1,2,3...
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
    try {
      //等待發出delete request
      const response = await fetch(`/delete/${taskId}`, {
        method: "DELETE",
      });
      //解析delete response
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  render();
}

function render() {
  const taskList = document.querySelector("#task-list");
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskListItem = document.createElement("li");
    taskListItem.textContent = task.text;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "刪除";
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });
    taskListItem.appendChild(deleteBtn);
    taskList.appendChild(taskListItem);
  });
}
