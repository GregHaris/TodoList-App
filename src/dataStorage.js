// export const setUpClearLocalStorageBtn = () => {
//   const clearLocalStorageBtn = document.querySelector("#clearLocalStorageBtn");
//   clearLocalStorageBtn.addEventListener("click", clearLocalStorage);
// }

// const clearLocalStorage = () => {
//   localStorage.clear();
// };


// export function saveData() {
//   const projectContainer = document.getElementById("projectContainer");
//   if (!projectContainer) return;

//   const data = {
//     projects: [],
//   };

//   const projectTitles = projectContainer.querySelectorAll(".project-title-container");
//   projectTitles.forEach((titleContainer) => {
//     const title = titleContainer.querySelector(".project-title").textContent;
//     const projectDetails = titleContainer.projectDetails;
//     const description = projectDetails.querySelector(".project-description")?.textContent || "";
//     const note = projectDetails.querySelector(".project-note")?.textContent || ""; // Corrected selector
//     const dueDate = projectDetails.querySelector("#dueDateInput")?.value || "";
//     const priority = projectDetails.querySelector("#priorityInput")?.value || "";
//     const subtasks = [];

//     const subtaskList = projectDetails.querySelector("#subtasksList");
//     if (subtaskList) {
//       subtaskList.querySelectorAll(".subtask").forEach((subtask) => {
//         subtasks.push({
//           title: subtask.textContent.trim(),
//           checked: subtask.classList.contains("checked"),
//         });
//       });
//     }

//     data.projects.push({
//       title,
//       description,
//       note,
//       dueDate,
//       priority,
//       subtasks,
//     });
//   });

//   localStorage.setItem("projectData", JSON.stringify(data));
// }

// export function loadData() {
//   const projectContainer = document.getElementById("projectContainer");
//   if (!projectContainer) return;

//   const data = JSON.parse(localStorage.getItem("projectData"));
//   if (!data || !data.projects) return;

//   data.projects.forEach((project) => {
//     const titleContainer = createProjectTitleContainer(project.title);
//     projectContainer.appendChild(titleContainer);

//     const projectDetails = createProjectDetails(projectContainer, project.title);
//     titleContainer.projectDetails = projectDetails;

//     projectDetails.querySelector("#descriptionInput").value = project.description;
//     projectDetails.querySelector("#noteInput").value = project.note;
//     projectDetails.querySelector("#dueDateInput").value = project.dueDate;
//     projectDetails.querySelector("#priorityInput").value = project.priority;

//     const subtaskList = projectDetails.querySelector("#subtasksList");
//     project.subtasks.forEach((subtask) => {
//       const subtaskElement = createSubTask(subtask.title, subtaskList);
//       if (subtask.checked) {
//         subtaskElement.classList.add("checked");
//       }
//     });

//     addProjectTitleEventListeners(titleContainer, projectContainer);
//   });
// }