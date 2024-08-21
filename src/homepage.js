import restaurantLogo from "./img/restaurantLogo.png";

//restuarant home page
const createElementWithText = (tagName, text, className) => {
  const element = document.createElement(tagName);
  element.textContent = text;
  if (className) element.classList.add(className);
  return element;
};

const createImageElement = (src, alt, className) => {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  if (className) image.classList.add(className);
  return image;
};

const createRestaurantHomePage = () => {
  const contentDiv = document.querySelector("#content");
  const pageContent = document.createElement("div");
  pageContent.classList.add("page-content");
  const homePageTextContainer = document.createElement("div");
  homePageTextContainer.classList.add("home-page-text-container");

  //create and append the logo
  const logo = createImageElement(
    restaurantLogo,
    "Restuarant Logo image",
    "logo"
  );

  pageContent.appendChild(logo);
  // Create and append the headline
  const headline = createElementWithText("h1", "Welcome", "headline");
  homePageTextContainer.appendChild(headline);

  // Create and append copy element (home page text)
  const copy = createElementWithText(
    "p",
    "Discover culinary perfection. Experience service excellence. Join the millions who rave about us.",
    "home-page-copy"
  );
  homePageTextContainer.appendChild(copy);

  pageContent.appendChild(homePageTextContainer);

  contentDiv.appendChild(pageContent);
};

createRestaurantHomePage();

export default createRestaurantHomePage;
