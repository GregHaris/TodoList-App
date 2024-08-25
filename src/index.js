import { add } from "date-fns";
import "./style.css";

// import createProject from "./project";

// Add event listener to the "Create Project" button
const createProjectBtn = document.querySelector("#createProjectBtn");
createProjectBtn.addEventListener("click", showModal);

// Close modal when clicking outside the content
document.querySelector("#modalOverlay").addEventListener("click", (e) => {
  if (e.target.id === "modalOverlay") {
    hideModal();
  }
});

function showModal() {
  document.querySelector("#modalOverlay").classList.remove("hidden");
  document.querySelector("#modalContent").classList.remove("hidden");
}

function hideModal() {
  document.querySelector("#modalOverlay").classList.add("hidden");
  document.querySelector("#modalContent").classList.add("hidden");
}
