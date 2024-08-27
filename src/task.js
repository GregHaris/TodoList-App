const createProjectSubtasks = () => {
  const subtasksContainer = document.createElement("div");
  subtasksContainer.classList.add("subtasks-container");

  const substasksHeading = document.createElement("h4");
  substasksHeading.classList.add("subtasks-heading");
  substasksHeading.textContent = "Subtasks"

  const subtasksCreatorContainer = document.createElement("div");
  subtasksCreatorContainer.classList.add("subtasks-creator-container");

  const subtasksInput = document.createElement("input");
  subtasksInput.placeholder = "Add a new substask"

  const addsubtasksBtn = document.createElement("button");
  addsubtasksBtn.textContent = "Add"
  subtasksCreatorContainer.append(subtasksInput, addsubtasksBtn);

  const subtasksList = document.createElement("ul");
  subtasksList.id = "subtasksList";
  subtasksList.classList.add("subtasks-list");

  subtasksInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addsubtasksBtn.click();
    }
  });

  addsubtasksBtn.addEventListener("click", () => {
    addTask();
    subtasksInput.value = "";
    // saveData();
  });

  function addTask() {
    subtasksInput.value === "" ? alert("Add a Subtask") : createSubTask();
  }

  function createSubTask() {
    const subtask = document.createElement("li");
    subtask.classList.add("subtask");
    subtask.textContent = subtasksInput.value;
    subtasksList.appendChild(subtask);
    // subtasksContainer.appendChild(subtasksList);

    const deletesubtaskSpan = document.createElement("span");
    deletesubtaskSpan.classList.add("delete-subtask");
    deletesubtaskSpan.textContent = "\u00d7";

    subtask.appendChild(deletesubtaskSpan);
  }

  subtasksList.addEventListener("click", (e) => {
    if (e.target.classList.contains("subtask")) {
      toggleChecked(e.target);
      // saveData();
    } else if (e.target.classList.contains("delete-subtask")) {
      removesubtask(e.target.parentElement);
      // saveData();
    }
  });

  function toggleChecked(subtask) {
    subtask.classList.toggle("checked");
  }

  function removesubtask(subtask) {
    subtask.remove();
  }

  function saveData() {
    const tasks = subtasksList.innerHTML;
    localStorage.setItem("data", tasks);
  }

  // function showTask() {
  //   const storedTasks = localStorage.getItem("data");
  //   subtasksList.innerHTML = "";
  //   subtasksList.innerHTML = storedTasks
  // }

  // showTask();

  subtasksContainer.append(substasksHeading, subtasksCreatorContainer, subtasksList);
  return subtasksContainer;
};

export default createProjectSubtasks;
