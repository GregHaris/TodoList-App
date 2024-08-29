// project.js
import createProjectSubtasks from "./task";
import createTask from "./taskFactory";
import {
  createElement,
  createInput,
  createButton,
  createSelect,
  createLabel,
} from "./domUtils";
import { saveData, loadData } from "./dataStorage";

let projectContainer, projectCreationSection;

document.addEventListener("DOMContentLoaded", () => {
  projectContainer = document.getElementById("projectContainer");
  projectCreationSection = document.getElementById("projectCreationSection");

  if (!projectContainer || !projectCreationSection) {
    console.error("Required DOM elements not found");
    return;
  }

  loadData();
  createProject();
});

export default function createProject() {
  const titleInputContainer = createTitleInputContainer();
  projectCreationSection.appendChild(titleInputContainer);

  createButtonEventListener(titleInputContainer, projectCreationSection);
  addTitleInputEventListener(titleInputContainer);
  saveData();
}

function createTitleInputContainer() {
  const container = createElement("div", "title-input-container");
  const input = createInput("text", "e.g; Finish Report", "title-input");
  const button = createButton("Add", "add-title-btn");
  container.append(input, button);
  return container;
}

function createButtonEventListener(container, section) {
  const button = container.querySelector("button");
  button.addEventListener("click", () => {
    const input = container.querySelector("input");
    const value = input.value.trim();

    if (value) {
      const titleContainer = createProjectTitleContainer(value);
      section.removeChild(container);
      section.appendChild(titleContainer);

      hideAllProjectDetails(projectContainer);
      const projectDetails = createProjectDetails(projectContainer, value);
      titleContainer.projectDetails = projectDetails; // Store project details in the title container
      addProjectTitleEventListeners(titleContainer, projectContainer);
    }
    saveData();
  });
}

function addTitleInputEventListener(container) {
  const input = container.querySelector("input");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const button = container.querySelector("button");
      button.click();
      saveData();
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

function addProjectTitleEventListeners(container, projectContainer) {
  const title = container.querySelector(".project-title");
  const editBtn = container.querySelector(".edit-btn");
  const deleteBtn = container.querySelector(".delete-btn");

  const editHandler = () => {
    title.setAttribute("contenteditable", true);
    title.focus();
    saveData();
  };

  const deleteHandler = () => {
    projectContainer.removeChild(container);
    saveData();
  };

  const titleClickHandler = () => {
    hideAllProjectDetails(projectContainer);
    showProjectDetails(container);
    saveData();
  };

  editBtn.addEventListener("click", editHandler);
  deleteBtn.addEventListener("click", deleteHandler);
  title.addEventListener("click", titleClickHandler);

  // Store event listeners for later removal if needed
  container.eventListeners = {
    edit: editHandler,
    delete: deleteHandler,
    titleClick: titleClickHandler,
  };
}

function removeProjectTitleEventListeners(container) {
  const title = container.querySelector(".project-title");
  const editBtn = container.querySelector(".edit-btn");
  const deleteBtn = container.querySelector(".delete-btn");

  if (container.eventListeners) {
    editBtn.removeEventListener("click", container.eventListeners.edit);
    deleteBtn.removeEventListener("click", container.eventListeners.delete);
    title.removeEventListener("click", container.eventListeners.titleClick);
    delete container.eventListeners;
  }
}

function createProjectDetails(container, value) {
  const projectDiv = createElement("div", "project");
  projectDiv.id = "project";

  projectDiv.appendChild(createProjectHeading(value));
  projectDiv.appendChild(createDescriptionContainer());
  projectDiv.appendChild(createDueDateContainer());
  projectDiv.appendChild(createPriorityContainer());
  projectDiv.appendChild(createNoteContainer());
  projectDiv.append(createProjectSubtasks());

  container.appendChild(projectDiv);
  return projectDiv;
}

function createProjectHeading(value) {
  return createElement("h1", "project-heading", value);
}

function createDescriptionContainer() {
  const container = createTextAreaContainer(
    "descriptionInput",
    "DESCRIPTION",
    "Describe your project here"
  );
  container.addEventListener("change", () => {
    updateProjectDescription(container);
    saveData();
  });
  return container;
}

function createNoteContainer() {
  const container = createTextAreaContainer(
    "noteInput",
    "NOTE",
    "Insert your notes here"
  );
  container.addEventListener("change", () => {
    updateProjectNote(container);
    saveData();
  });
  return container;
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
  const descriptionHeadingContainer = createElement("div");
  const descriptionHeading = createElement("h4", null, "DESCRIPTION");
  const description = createElement("p", "project-description");
  description.setAttribute("contenteditable", true);
  description.textContent = container.querySelector("textarea").value;
  descriptionHeadingContainer.appendChild(descriptionHeading);
  descriptionContainer.append(descriptionHeadingContainer, description);
  container.innerHTML = "";
  container.appendChild(descriptionContainer);
  saveData();
}

function createDueDateContainer() {
  const container = createElement("div", "due-date-container");
  const input = createInput("date", null, "dueDateInput");
  input.required = true;
  const label = createLabel(input.id, "Deadline: ");
  container.append(label, input);

  // Save data when the due date is set
  input.addEventListener("change", () => {
    saveData();
  });

  return container;
}

function createPriorityContainer() {
  const container = createElement("div", "priority-container");
  const input = createSelect(
    ["Undecided", "High", "Medium", "Low"],
    "priorityInput"
  );
  const label = createLabel(input.id, "Project Priority: ");

  input.addEventListener("change", (e) => {
    setPriorityBackgroundColor(e.target);
    saveData();
  });

  setPriorityBackgroundColor(input);
  container.append(label, input);
  return container;
}

function setPriorityBackgroundColor(input) {
  const colors = {
    Undecided: "#808080",
    High: "#FF0000",
    Medium: "#007FFF",
    Low: "#228B22",
  };
  input.style.backgroundColor = colors[input.value] || "#808080";
}

function updateProjectNote(container) {
  const noteContainer = createElement("div");
  const noteHeadingContainer = createElement("div");
  const noteHeading = createElement("h4", null, "NOTE");
  const note = createElement("p", "project-description");
  note.setAttribute("contenteditable", true);
  note.textContent = container.querySelector("textarea").value;
  noteHeadingContainer.appendChild(noteHeading);
  noteContainer.append(noteHeadingContainer, note);
  container.innerHTML = "";
  container.appendChild(noteContainer);
  saveData();
}

function hideAllProjectDetails(projectContainer) {
  const projectDetails = projectContainer.querySelectorAll(".project");
  projectDetails.forEach((detail) => (detail.style.display = "none"));
  saveData();
}

function showProjectDetails(container) {
  if (container.projectDetails) {
    container.projectDetails.style.display = "block";
  }
  saveData();
}