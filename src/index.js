import { add } from "date-fns";
import "./style.css";

const inputBox = document.querySelector("#input-box");
const addItemBtn = document.querySelector("#add-btn");
const listContainer = document.querySelector("#list-container");
listContainer.classList.add("list-container");

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addItemBtn.click();
  }
});

addItemBtn.addEventListener("click", () => {
  addTask();
  inputBox.value = "";
  saveData();
});

function addTask() {
  inputBox.value === "" ? alert("Add a TodoList Item") : createTodoListItem();
}

function createTodoListItem() {
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");
  listItem.textContent = inputBox.value;
  listContainer.appendChild(listItem);

  const deleteListItemSpan = document.createElement("span");
  deleteListItemSpan.classList.add("delete-list-item");
  deleteListItemSpan.textContent = "\u00d7";

  listItem.appendChild(deleteListItemSpan);
}

listContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("list-item")) {
    toggleChecked(e.target);
    saveData();
  } else if (e.target.classList.contains("delete-list-item")) {
    removeListItem(e.target.parentElement);
    saveData();
  }
});

function toggleChecked(listItem) {
  listItem.classList.toggle("checked");
}

function removeListItem(ListItem) {
  ListItem.remove();
}

function saveData() {
  const tasks = listContainer.innerHTML
  localStorage.setItem("data", tasks);
}

function showTask() {
  const storedTasks = localStorage.getItem("data");
  listContainer.innerHTML = "";
  listContainer.innerHTML = storedTasks
}

showTask();
