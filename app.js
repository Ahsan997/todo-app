//UI Variables
const form = document.querySelector("#task-form");
const tasklist = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskinput = document.querySelector("#task");

//load all event listeners

loadEventListeners();

//load all event listeners

function loadEventListeners() {
  // Add Task event
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  clearBtn.addEventListener("click", clearTasks);
  tasklist.addEventListener("click", removeTask);
  filter.addEventListener("keyup", filterTasks);
}
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    //append textnode to li
    li.appendChild(document.createTextNode(task));
    //create link for delete
    const link = document.createElement("a");
    //add Class
    link.className = "delete-item secondary-content";
    //add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    tasklist.appendChild(li);
  });
}
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
function removeTask(e) {
  if (e.target.parentElement.classList.contains("secondary-content")) {
    if (confirm("Are You Sure ?")) {
      e.target.parentElement.parentElement.remove();
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
function removeFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function clearTasks(e) {
  //tasklist.innerHTML = '';
  if (confirm("Are You Sure?")) {
    while (tasklist.firstChild) {
      tasklist.removeChild(tasklist.firstChild);
    }
    // tasklist.remove();
    clearTasksFromLocalStorage();
  } else {
    e.preventDefault();
  }
}
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
function addTask(e) {
  if (taskinput.value === "") {
    alert("Add a Task");
  } else {
    //create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    //append textnode to li
    li.appendChild(document.createTextNode(taskinput.value));
    //create link for delete
    const link = document.createElement("a");
    //add Class
    link.className = "delete-item secondary-content";
    //add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    tasklist.appendChild(li);
    storeTaskInLocalStorage(taskinput.value);
  }
  //clear input
  taskinput.value = "";

  e.preventDefault();
}
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
