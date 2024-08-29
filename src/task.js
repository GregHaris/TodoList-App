// task.js
import createTask from "./taskFactory";
import { createElement, createInput, createButton } from "./domUtils";
import { saveData } from "./dataStorage";

const createProjectSubtasks = () => {
  const container = createElement("div", "subtasks-container");
  const heading = createElement("h4", "subtasks-heading", "Subtasks");
  const creatorContainer = createElement("div", "subtasks-creator-container");
  const input = createInput("text", "Add a new subtask");
  const button = createButton("Add", "add-subtask-btn");
  creatorContainer.append(input, button);

  const list = document.createElement("ul");
  list.id = "subtasksList";
  list.classList.add("subtasks-list");

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      button.click();
    }
  });

  button.addEventListener("click", () => {
    addTask(input, list);
    input.value = "";
    saveData()
  });

  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("subtask")) {
      toggleChecked(e.target);
      saveData()
    } else if (e.target.classList.contains("delete-subtask")) {
      removeSubtask(e.target.parentElement);
      saveData()
    }
  });

  container.append(heading, creatorContainer, list);
  return container;
};

function addTask(input, list) {
  const value = input.value.trim();
  if (value === "") {
    alert("Add a Subtask");
  } else {
    createSubTask(value, list);
    saveData()
  }
}

function createSubTask(value, list) {
  const task = createTask(value, "");
  const subtask = createElement("li", "subtask", task.title);
  const deleteSpan = createElement("span", "delete-subtask", "\u00d7");
  subtask.appendChild(deleteSpan);
  list.appendChild(subtask);
}

function toggleChecked(subtask) {
  subtask.classList.toggle("checked");
}

function removeSubtask(subtask) {
  subtask.remove();
}

export default createProjectSubtasks;