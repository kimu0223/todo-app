'use strict';

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  document.getElementById("add-button").addEventListener("click", addTask);
});

let tasks = [];

function addTask() {
  const taskInput = document.getElementById("task-input");
  const category = document.getElementById("category").value;
  const isPending = document.getElementById("is-pending").checked;

  const text = taskInput.value.trim();
  if (text === "") return;

  const task = {
    id: Date.now(),
    text: text,
    category: category,
    completed: false,
    pending: isPending,
    comment: "",
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  clearForm();
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    // チェックボックスで削除
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => deleteTask(task.id));
    li.appendChild(checkbox);

    // タスク名
    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.marginLeft = "8px";
    li.appendChild(span);

    // コメント欄
    const commentArea = document.createElement("textarea");
    commentArea.rows = 6;
    commentArea.placeholder = "進捗コメントを入力してください";
    commentArea.style.marginLeft = "10px";
    commentArea.value = task.comment || "";
    commentArea.addEventListener("input", () => {
      task.comment = commentArea.value;
      saveTasks();
    });
    li.appendChild(commentArea);

    // カテゴリスタイル
    li.classList.add(`category-${task.category}`);
    if (task.completed) span.style.textDecoration = "line-through";
    if (task.pending) li.style.opacity = "0.6";

    taskList.appendChild(li);
  });
}

// 削除機能
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();
}

function clearForm() {
  document.getElementById("task-input").value = "";
  document.getElementById("category").value = "work";
  document.getElementById("is-pending").checked = false;
}
