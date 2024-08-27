import createProjectSubtasks from "./task";
// Get project title.
export default function createProject() {
  const projectCreationSection = document.querySelector(
    "#projectCreationSection"
  );
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
      const projectTitleContainer =
        createProjectTitleContainer(titleInputValue);
      projectCreationSection.removeChild(titleInputContainer);
      projectCreationSection.appendChild(projectTitleContainer);

      addProjectTitleEventListeners(
        projectTitleContainer,
        projectCreationSection
      );
    }
  });
}

function addTitleInputEventListener(titleInputContainer) {
  const titleInput = titleInputContainer.querySelector("input");
  titleInput.addEventListener("keydown", (e) => {
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

function addProjectTitleEventListeners(
  projectTitleContainer,
  projectCreationSection
) {
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

  projectTitle.addEventListener(
    "click",
    () => {
      const projectContainer = document.querySelector("#projectContainer");
      const projectHeading = document.createElement("h1");
      projectHeading.classList.add("project-heading");
      projectHeading.textContent = projectTitle.textContent;

      projectContainer.insertBefore(
        projectHeading,
        projectContainer.firstChild
      );
      createProjectDetails(projectContainer);
    },
    { once: true }
  );
}

function createProjectDetails(projectContainer) {
  const projectDiv = document.createElement("div");
  projectDiv.id = "project";
  projectDiv.classList.add("project");

  // factory function to create textarea inputs
  function createTextAreaContainer(id, heading, placeholder) {
    const textAreaContainer = document.createElement("div");
    const textAreaHeadingContainer = document.createElement("div");
    const textAreaHeading = document.createElement("h4");
    const textArea = document.createElement("textarea");

    textArea.id = id;
    textArea.placeholder = placeholder;

    textAreaHeading.textContent = heading;

    textAreaHeadingContainer.appendChild(textAreaHeading);
    textAreaContainer.append(textAreaHeading, textArea);

    return textAreaContainer;
  }

  //Add project description
  const descriptionContainer = createTextAreaContainer(
    "descriptionInput",
    "DESCRIPTION",
    "Describe your project here"
  );
  projectDiv.appendChild(descriptionContainer);

  descriptionContainer.addEventListener("change", () => {
    updateProjectDescription();
  });
  function updateProjectDescription() {
    const projectDescriptionContainer = document.createElement("div");
    const projectDescription = document.createElement("p");
    projectDescription.classList.add("project-description");
    projectDescription.setAttribute("contenteditable", true);
    projectDescription.textContent = descriptionInput.value;
    projectDescriptionContainer.appendChild(projectDescription);

    descriptionContainer.removeChild(descriptionInput);
    descriptionContainer.appendChild(projectDescriptionContainer);
  }

  // Add project due date
  const dueDateContainer = document.createElement("div");
  dueDateContainer.classList.add("due-date-container");

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.required = true;
  dueDateInput.id = "dueDateInput";

  const dueDateInputLabel = document.createElement("label");
  dueDateInputLabel.htmlFor = dueDateInput;
  dueDateInputLabel.textContent = "Deadline: ";

  dueDateContainer.append(dueDateInputLabel, dueDateInput);
  projectDiv.appendChild(dueDateContainer);

  // Add project priority
  const priorityContainer = document.createElement("div");
  priorityContainer.classList.add("priority-container");

  const priorityInput = document.createElement("select");
  priorityInput.id = "priorityInput";

  const priorityInputLabel = document.createElement("label");
  priorityInputLabel.htmlFor = priorityInput;
  priorityInputLabel.textContent = "Project Priority: ";

  const priorityOptions = ["Undecided", "High", "Medium", "Low"];
  priorityOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    priorityInput.appendChild(optionElement);
  });

  // Function to set the background color based on the priority value
  function setPriorityBackgroundColor() {
    switch (priorityInput.value) {
      case "High":
        priorityInput.style.backgroundColor = "#FF0000";
        break;
      case "Medium":
        priorityInput.style.backgroundColor = "#007FFF";
        break;
      case "Low":
        priorityInput.style.backgroundColor = "#228B22";
        break;
      default:
        priorityInput.style.backgroundColor = "#808080";
        break;
    }
  }
  // Set initial background color
  setPriorityBackgroundColor();

  // Add event listener to update the background color when the value changes
  priorityInput.addEventListener("change", setPriorityBackgroundColor);

  priorityContainer.append(priorityInputLabel, priorityInput);
  projectDiv.appendChild(priorityContainer);

  // Add project Note
  const noteContainer = createTextAreaContainer(
    "noteInput",
    "NOTE",
    "Insert your notes here"
  );
  projectDiv.appendChild(noteContainer);

  noteContainer.addEventListener("change", () => {
    updateProjectnote();
  });
  function updateProjectnote() {
    const projectNoteContainer = document.createElement("div");
    const projectNote = document.createElement("p");
    projectNote.classList.add("project-description");
    projectNote.setAttribute("contenteditable", true);
    projectNote.textContent = noteInput.value;
    projectNoteContainer.appendChild(projectNote);

    noteContainer.removeChild(noteInput);
    noteContainer.appendChild(projectNoteContainer);
  }

  // add subtasks
  projectDiv.append(createProjectSubtasks());

  projectContainer.appendChild(projectDiv);
}
