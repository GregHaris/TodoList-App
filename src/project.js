// project.js
import createProjectSubtasks from "./task";
import createTask from "./taskFactory";
import { createElement, createInput, createButton, createSelect, createLabel } from "./domUtils";

export default function createProject() {
  const projectCreationSection = document.querySelector("#projectCreationSection");
  const titleInputContainer = createTitleInputContainer();
  projectCreationSection.appendChild(titleInputContainer);

  addTitleBtnEventListener(titleInputContainer, projectCreationSection);
  addTitleInputEventListener(titleInputContainer);
}

function createTitleInputContainer() {
  const container = createElement("div", "title-input-container");
  const input = createInput("text", "e.g; Finish Report", "title-input");
  const button = createButton("Add", "add-title-btn");
  container.append(input, button);
  return container;
}

function addTitleBtnEventListener(container, section) {
  const button = container.querySelector("button");
  button.addEventListener("click", () => {
    const input = container.querySelector("input");
    const value = input.value.trim();

    if (value) {
      const titleContainer = createProjectTitleContainer(value);
      section.removeChild(container);
      section.appendChild(titleContainer);

      addProjectTitleEventListeners(titleContainer, section);
    }
  });
}

function addTitleInputEventListener(container) {
  const input = container.querySelector("input");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const button = container.querySelector("button");
      button.click();
    }
  });
}

function createProjectTitleContainer(value) {
  const container = createElement("div", "project-title-container");
  const title = createElement("h4", "project-title", value);
  const buttonsContainer = createElement("div", "project-title-btns-container");
  const editBtn = createButton("✍︎", "edit-btn");
  const deleteBtn = createButton("\u00d7", "delete-btn");
  buttonsContainer.append(editBtn, deleteBtn);
  container.append(title, buttonsContainer);
  return container;
}

function addProjectTitleEventListeners(container, section) {
  const title = container.querySelector(".project-title");
  const editBtn = container.querySelector(".edit-btn");
  const deleteBtn = container.querySelector(".delete-btn");

  editBtn.addEventListener("click", () => {
    title.setAttribute("contenteditable", true);
    title.focus();
  });

  deleteBtn.addEventListener("click", () => {
    section.removeChild(container);
  });

  title.addEventListener("click", () => {
    const projectContainer = document.querySelector("#projectContainer");
    const heading = createElement("h1", "project-heading", title.textContent);
    projectContainer.insertBefore(heading, projectContainer.firstChild);
    createProjectDetails(projectContainer);
  }, { once: true });
}

function createProjectDetails(container) {
  const projectDiv = createElement("div", "project");
  projectDiv.id = "project";

  const descriptionContainer = createTextAreaContainer("descriptionInput", "DESCRIPTION", "Describe your project here");
  projectDiv.appendChild(descriptionContainer);

  descriptionContainer.addEventListener("change", () => {
    updateProjectDescription(descriptionContainer);
  });

  const dueDateContainer = createDueDateContainer();
  projectDiv.appendChild(dueDateContainer);

  const priorityContainer = createPriorityContainer();
  projectDiv.appendChild(priorityContainer);

  const noteContainer = createTextAreaContainer("noteInput", "NOTE", "Insert your notes here");
  projectDiv.appendChild(noteContainer);

  noteContainer.addEventListener("change", () => {
    updateProjectNote(noteContainer);
  });

  projectDiv.append(createProjectSubtasks());
  container.appendChild(projectDiv);
}

function createTextAreaContainer(id, heading, placeholder) {
  const container = createElement("div");
  const headingContainer = createElement("div");
  const headingElement = createElement("h4", null, heading);
  const textArea = document.createElement("textarea");
  textArea.id = id;
  textArea.placeholder = placeholder;
  headingContainer.appendChild(headingElement);
  container.append(headingContainer, textArea);
  return container;
}

function updateProjectDescription(container) {
  const descriptionContainer = createElement("div");
  const description = createElement("p", "project-description");
  description.setAttribute("contenteditable", true);
  description.textContent = container.querySelector("textarea").value;
  descriptionContainer.appendChild(description);
  container.innerHTML = '';
  container.appendChild(descriptionContainer);
}

function createDueDateContainer() {
  const container = createElement("div", "due-date-container");
  const input = createInput("date", null, "dueDateInput");
  input.required = true;
  const label = createLabel(input.id, "Deadline: ");
  container.append(label, input);
  return container;
}

function createPriorityContainer() {
  const container = createElement("div", "priority-container");
  const input = createSelect(["Undecided", "High", "Medium", "Low"], "priorityInput");
  const label = createLabel(input.id, "Project Priority: ");
  
  input.addEventListener("change", (e) => {
    setPriorityBackgroundColor(e.target);
  });
  
  setPriorityBackgroundColor(input);
  container.append(label, input);
  return container;
}

function setPriorityBackgroundColor(input) {
  const colors = {
    "Undecided": "#808080",
    "High": "#FF0000",
    "Medium": "#007FFF",
    "Low": "#228B22"
  };
  input.style.backgroundColor = colors[input.value] || "#808080";
}

function updateProjectNote(container) {
  const noteContainer = createElement("div");
  const note = createElement("p", "project-description");
  note.setAttribute("contenteditable", true);
  note.textContent = container.querySelector("textarea").value;
  noteContainer.appendChild(note);
  container.innerHTML = '';
  container.appendChild(noteContainer);
}