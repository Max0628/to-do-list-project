/*
MCV設計模式
model(data-base這邊沒有)
controller(控制器，指的是Javascript部分)
view(UI呈現，指的是HTML部分)

程式執行順序
輸入要新增的項目->點擊按鈕->呼叫addTask或deleteTask函數->state object改變->render function渲染到畫面
*/

// 定義一個叫做state的物件，其中包含一個叫做task的array來存儲所有待辦事項
// 使用object允許我們在之後添加更多的狀態屬性，例如過濾條件等。
const state = { tasks: [] };

//當呼叫此函數時，push當前的元素到state物件中
function addTask() {
  //選取到input的輸入框
  const newTaskElement = document.querySelector("#new-task");
  //確認使用者輸入非空白，允許輸入
  if (newTaskElement.value.trim() !== "") {
    //將當前元素push到state物件中的tasks陣列中，並賦予屬性text為選取元素的value
    state.tasks.push({ text: newTaskElement.value });
    //清空<input>輸入框，等候下一次輸入
    newTaskElement.value = "";
    //到這邊為止，state已經被push進去新的element了，但是頁面還沒新增，因為還沒呼叫render函數
    // 呼叫render函數，render會迭代過state物件，並渲染到頁面
    render();
  }
}

//呼叫此函數用於在state物件中刪除當前元素
function deleteTask(currTaskIndex) {
  //使用splice方法，選取當前的目錄，刪除一項元素，也就是刪除當的元素
  state.tasks.splice(currTaskIndex, 1);
  //到這邊為止，state已經被push進去新的element了，但是頁面還沒新增，因為還沒呼叫render函數
  // 呼叫render函數，render會迭代過state物件，並渲染到頁面
  render();
}

function render() {
  // 選取頁面上用於顯示任務列表的ul元素
  // 使用quertSelector要用css selecotr方法，若選取id 要加上#
  const taskListElement = document.querySelector("#task-list");
  //清空<ul>內所有的innHTML，包含<li>，確保剛剛輸入的<li>不會被重複累加
  taskListElement.innerHTML = "";

  // 迭代state物件中 tasks 陣列內的元素
  state.tasks.forEach((task, index) => {
    // 為每個元素創建一個 li元素
    const taskElement = document.createElement("li");

    //將state裡面task陣列中的text屬性(也就是剛剛push進去的，有text跟completed屬性)
    //設定給HTML頁面上的textContent屬性，渲染在這邊發生，將物件的的文字渲染到HTML畫面
    taskElement.textContent = task.text;

    // 渲染時創建一個刪除按鈕
    const deleteBtn = document.createElement("button");
    // 設置刪除按鈕的文本。
    deleteBtn.textContent = "刪除";
    // 為刪除按鈕添加點擊事件處理器。
    // 當按鈕被點擊時，呼叫deleteTask函數，並將目前的index傳給deleteTask函數
    deleteBtn.onclick = () => deleteTask(index);

    //將剛剛設定的刪除按鈕新增到每個新增的li元素後面
    taskElement.appendChild(deleteBtn);

    //將剛剛設定的li元素新增到ul元素裡面
    taskListElement.appendChild(taskElement);
  });
}
