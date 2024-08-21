import createRestaurantHomePage from "./homepage";
import createTabs from "./tabs";

function initialLoad() {
  createTabs();
  createRestaurantHomePage();
}

export default initialLoad;
