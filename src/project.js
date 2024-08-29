import createProjectSubtasks from "./task";
import createTask from "./taskFactory";
import {
  createElement,
  createInput,
  createEditablePInput,
  createButton,
  createSelect,
  createLabel,
} from "./domUtils";
// import { setUpClearLocalStorageBtn, saveData, loadData } from "./dataStorage"; // Import saveData and loadData

let projectContainer, projectCreationSection;

document.addEventListener("DOMContentLoaded", () => {
  projectContainer = document.querySelector("#projectContainer");
  projectCreationSection = document.querySelector("#projectCreationSection");

  if (!projectContainer || !projectCreationSection) {
    console.error("Required DOM elements not found");
    return;
  }

  // loadData(); // Call loadData to restore the application state
  createProject();
});

export default function createProject() {
  const titleInputContainer = createTitleInputContainer();
  projectCreationSection.appendChild(titleInputContainer);

  createButtonEventListener(titleInputContainer, projectCreationSection);
  addTitleInputEventListener(titleInputContainer);
  // saveData(); // Call saveData to persist the initial state
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
    // saveData(); // Call saveData after adding a new project
  });
}

function addTitleInputEventListener(container) {
  const input = container.querySelector("input");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const button = container.querySelector("button");
      button.click();
      // saveData(); // Call saveData after pressing Enter
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
    // saveData(); // Call saveData after editing the title
  };

  const deleteHandler = () => {
    projectContainer.removeChild(container);
    // saveData(); // Call saveData after deleting a project
  };

  const titleClickHandler = () => {
    hideAllProjectDetails(projectContainer);
    showProjectDetails(container);
    // saveData(); // Call saveData after clicking on a project title
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
  const container = createElement("div", "description-container");
  const descriptionHeadingContainer = createElement(
    "div",
    "description-heading-container"
  );
  const descriptionHeading = createElement(
    "h4",
    "description-heading",
    "DESCRIPTION"
  );
  const description = createEditablePInput(
    "Describe your project here",
    "project-description"
  );

  descriptionHeadingContainer.appendChild(descriptionHeading);
  container.append(descriptionHeadingContainer, description);

  return container;
}

function createNoteContainer() {
  const container = createElement("div", "note-container");
  const noteHeadingContainer = createElement("div", "note-heading-container");
  const noteHeading = createElement("h4", "note-heading", "NOTE");
  const note = createEditablePInput("Insert your notes here", "project-note");

  noteHeadingContainer.appendChild(noteHeading);
  container.append(noteHeadingContainer, note);

  return container;
}

function createDueDateContainer() {
  const container = createElement("div", "due-date-container");
  const input = createInput("Deadline", "dueDateInput");
  input.setAttribute("type", "date");
  input.required = true;
  const label = createLabel(input.id, "DEADLINE: ");
  container.append(label, input);

  // Save data when the due date is set
  input.addEventListener("change", () => {
    // saveData(); // Call saveData after changing the due date
  });

  return container;
}

function createPriorityContainer() {
  const container = createElement("div", "priority-container");
  const input = createSelect(
    ["Undecided", "High", "Medium", "Low"],
    "priorityInput"
  );
  const label = createLabel(input.id, "PROJECT PRIORITY: ");

  input.addEventListener("change", (e) => {
    setPriorityBackgroundColor(e.target);
    // saveData(); // Call saveData after changing the priority
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

function hideAllProjectDetails(projectContainer) {
  const projectDetails = projectContainer.querySelectorAll(".project");
  projectDetails.forEach((detail) => (detail.style.display = "none"));
  // saveData(); // Call saveData after hiding project details
}

function showProjectDetails(container) {
  if (container.projectDetails) {
    container.projectDetails.style.display = "block";
  }
  // saveData(); // Call saveData after showing project details
}