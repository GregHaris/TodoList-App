export function saveData() {
  try {
    const data = {
      projectContainer: projectContainer.innerHTML,
      projectCreationSection: projectCreationSection.innerHTML,
    };
    localStorage.setItem("data", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

export function loadData() {
  try {
    const dataString = localStorage.getItem("data");
    if (dataString) {
      const data = JSON.parse(dataString);
      projectContainer.innerHTML = data.projectContainer;
      projectCreationSection.innerHTML = data.projectCreationSection;
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }
}