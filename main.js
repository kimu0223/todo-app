'use strict';
// htmlの読み込みが完了してから実行する
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  // 追加ボタンを押すとタスクが追加される
  document.getElementById("add-button").addEventListener("click", addTask);
});

// タスクの配列
let tasks = [];

// タスクを追加
function addTask() {
  const taskInput = document.getElementById("task-input");
  const category = document.getElementById("category").value;
  const isPending = document.getElementById("is-pending").checked;

  // タスクが空入力の場合は、何もしない
  const text = taskInput.value.trim();
  if (text === "") return;

  // タスクのオブジェクト
  const task = {
    id: Date.now(),
    text: text,
    category: category,
    completed: false,
    pending: isPending
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  clearForm();
}

// タスクを表示させる
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    li.classList.add(`category-${task.category}`);

    // 完了タスクの場合は取り消し線
    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    // 検討中タスクは透明度を下げる
    if (task.pending) {
      li.style.opacity = "0.6";
    }

    // 削除ボタンの作成
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    // 削除処理を呼び出し
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// タスクを削除する
function deleteTask(id) {
  // IDが一致するタスクを除外して新しい配列を作成
  tasks = tasks.filter(task => task.id !== id);

  // 更新されたタスクリストを保存
  saveTasks();

  // タスクリストを再描画
  renderTasks();
}

// タスクを保存する
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// タスクを読み込む
function loadTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();
}

// タスク入力後にフォームをクリアする
function clearForm() {
  document.getElementById("task-input").value = "";
  document.getElementById("category").value = "work";
  document.getElementById("is-pending").checked = false;
}
