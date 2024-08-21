import createRestaurantHomePage from "./homepage";
import createMenuPage from "./menu";
import createContactPage from "./contact";

const createTabs = (() => {
  const navBar = document.querySelector("nav");

  // tap buttons creation factory
  const createTabButton = (id, text, onClick) => {
    const button = document.createElement("button");
    button.id = id;
    button.classList.add("tab");
    button.textContent = text;
    button.addEventListener("click", () => {
      clearContent();
      onClick();
    });
    return button;
  };

  // creating tab buttons
  const homeBtn = createTabButton("homeBtn", "Home", createRestaurantHomePage);
  const menuBtn = createTabButton("menuBtn", "Menu", createMenuPage);
  const contactBtn = createTabButton(
    "contactBtn",
    "Contact",
    createContactPage
  );

  navBar.append(homeBtn, menuBtn, contactBtn);
})();

function clearContent() {
  const contentDiv = document.querySelector("#content");

  while (contentDiv.firstChild) {
    contentDiv.removeChild(contentDiv.firstChild);
  }
}

export default createTabs;
