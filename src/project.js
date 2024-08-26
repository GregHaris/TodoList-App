// Get project title.
export default function createProject() {
  const projectCreationSection = document.querySelector("#projectCreationSection");
  const titleInputContainer = createTitleInputContainer();
  projectCreationSection.appendChild(titleInputContainer);

  addTitleBtnEventListener(titleInputContainer, projectCreationSection);
  addTitleInputEventListener(titleInputContainer);
}

function createTitleInputContainer() {
  const titleInputContainer = document.createElement("div");
  titleInputContainer.classList.add("title-input-container");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "e.g; Finish Report";
  titleInput.classList.add("title-input");

  const addTitleBtn = document.createElement("button");
  addTitleBtn.textContent = "Add";

  titleInputContainer.append(titleInput, addTitleBtn);
  return titleInputContainer;
}

function addTitleBtnEventListener(titleInputContainer, projectCreationSection) {
  const addTitleBtn = titleInputContainer.querySelector("button");
  addTitleBtn.addEventListener("click", () => {
    const titleInput = titleInputContainer.querySelector("input");
    const titleInputValue = titleInput.value.trim();

    if (titleInputValue) {
      const projectTitleContainer = createProjectTitleContainer(titleInputValue);
      projectCreationSection.removeChild(titleInputContainer);
      projectCreationSection.appendChild(projectTitleContainer);

      addProjectTitleEventListeners(projectTitleContainer, projectCreationSection);
    }
  });
}

function addTitleInputEventListener(titleInputContainer) {
  const titleInput = titleInputContainer.querySelector("input");
  titleInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const addTitleBtn = titleInputContainer.querySelector("button");
      addTitleBtn.click();
    }
  });
}

function createProjectTitleContainer(titleInputValue) {
  const projectTitleContainer = document.createElement("div");
  projectTitleContainer.classList.add("project-title-container");

  const projectTitle = document.createElement("h4");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = titleInputValue;

  const projectTitleBtnsContainer = document.createElement("div");
  projectTitleBtnsContainer.classList.add("project-title-btns-container");

  const editBtn = document.createElement("button");
  editBtn.textContent = "✍︎";
  editBtn.classList.add("edit-btn");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "\u00d7";
  deleteBtn.classList.add("delete-btn");

  projectTitleBtnsContainer.append(editBtn, deleteBtn);
  projectTitleContainer.append(projectTitle, projectTitleBtnsContainer);
  return projectTitleContainer;
}

function addProjectTitleEventListeners(projectTitleContainer, projectCreationSection) {
  const projectTitle = projectTitleContainer.querySelector(".project-title");
  const editBtn = projectTitleContainer.querySelector(".edit-btn");
  const deleteBtn = projectTitleContainer.querySelector(".delete-btn");

  editBtn.addEventListener("click", () => {
    projectTitle.setAttribute("contenteditable", true);
    projectTitle.focus();
  });

  deleteBtn.addEventListener("click", () => {
    projectCreationSection.removeChild(projectTitleContainer);
  });

  projectTitle.addEventListener("click", () => {
    const projectContainer = document.querySelector("#projectContainer");
    const projectHeading = document.createElement("h1");
    projectHeading.classList.add("project-heading");
    projectHeading.textContent = projectTitle.textContent;

    projectContainer.insertBefore(projectHeading, projectContainer.firstChild);
  });
}

function createProjectDetails () {
  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.id = "descriptionInput";
  descriptionInput.placeholder = "Description";

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.id = "dueDateInput";

  const priorityInput = document.createElement("select");
  priorityInput.id = "priorityInput";
  const priorityOptions = ["high", "medium", "low"];
  priorityOptions.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    priorityInput.appendChild(optionElement);
  });

  const noteInput = document.createElement("textarea");
  noteInput.id = "noteInput";
  noteInput.placeholder = "Notes";

}