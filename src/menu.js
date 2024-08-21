const createMenuPage = () => {
  const contentDiv = document.querySelector("#content");
  const pageContent = document.createElement("div");
  pageContent.classList.add("page-content");

  const menuPageContainer = document.createElement("div")
  menuPageContainer.classList.add("menu-list-container")

  const menuPgHeading = document.createElement("h1");
  menuPgHeading.classList.add("menu-page-heading");
  menuPgHeading.textContent = "Our Menu";

  const menuList = document.createElement("ul");
  menuList.classList.add("menu-list");
  const menuItem1 = document.createElement("li");
  menuItem1.textContent = "Spaghetti";
  const menuItem2 = document.createElement("li");
  menuItem2.textContent = "Taccos";
  const menuItem3 = document.createElement("li");
  menuItem3.textContent = "Pizza";
  const menuItem4 = document.createElement("li");
  menuItem4.textContent = "Alfredo";

  menuList.append(menuItem1, menuItem2, menuItem3, menuItem4);

  menuPageContainer.append(menuPgHeading, menuList)

  pageContent.append(menuPageContainer);

  contentDiv.appendChild(pageContent)
};

export default createMenuPage;
