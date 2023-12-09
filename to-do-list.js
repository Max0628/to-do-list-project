//獲取<input> tag
let getinput = document.querySelector("#myInput");
//獲取文件中的<ul> tag
let ul = document.querySelector("#myUL");

//設定函數用來新增項目
function addItem() {
  //將輸入文字前後去除空白，避免使用者手誤
  let inputText = getinput.value.trim();
  if (inputText == "") {
    alert("你還未輸入待辦事項唷~");
    return;
  }

  //在document中創建一個新的<li> tag 元素，賦值給變數li
  //還沒插入li，所以目前li只存在於記憶體當中
  let li = document.createElement("li");

  //將輸入的值設定給新創建的html tag<li>，的文字屬性
  li.textContent = getinput.value;

  //將li插入到ul中，這邊不是寫li.textContent唷，我們直接，因為要呼叫的是li本人而不是li的文字屬性
  ul.appendChild(li);

  //新建立一個按鈕，設定給變數deleteButton
  const deleteButton = document.createElement("button");
  //設定按鈕的文字屬性為"刪除"
  deleteButton.textContent = "刪除";
  //如果刪除被點下，在document中移除li元素，
  deleteButton.addEventListener("click", function () {
    li.remove();
  });
  //將刪除按鈕插入li中
  li.appendChild(deleteButton);

  //清空輸入框，方便輸入下一個待辦事項
  getinput.value = "";
}

//在文件中選取按鈕物件，如果發生滑鼠左鍵點擊事件，執行addItem新增待辦事項
document.querySelector("button").addEventListener("click", addItem);

//選取到<input>，如果使用者在這邊按下"enter"，也同樣會觸發addItem
getinput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addItem();
  }
});
