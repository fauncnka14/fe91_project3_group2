import { format } from "/node_modules/date-fns/index.js";
const currentDate = new Date();
const formattedDate = format(currentDate, "dd-MM-yyyy HH:mm:ss");
console.log(`Текущая дата и время: ${formattedDate}`);

const currentTime = document.getElementById("currentTime");
currentTime.textContent = ` ${formattedDate}`;

class ThemeSwithcer {
  selectors = {
    switchThemeButton: "[data-js-theme-switcher]",
  };
  themes = {
    dark: "dark",
    light: "light",
  };
  stateClasses = {
    isDarkTheme: "is-dark-theme",
  };

  storageKey = "them";

  constructor() {
    this.switchThemeButtonElement = document.querySelector(
      this.selectors.switchThemeButton
    );
    this.setInitialTheme();
    this.bindEvents();
  }
  get isDarkThemeCached() {
    return localStorage.getItem(this.storageKey) === this.themes.dark;
  }

  setInitialTheme() {
    document.documentElement.classList.toggle(
      this.stateClasses.isDarkTheme,
      this.isDarkThemeCached
    );
  }
  onClick = () => {
    localStorage.setItem(
      this.storageKey,
      this.isDarkThemeCached ? this.themes.light : this.themes.dark
    );
    document.documentElement.classList.toggle(this.stateClasses.isDarkTheme);
  };

  bindEvents() {
    this.switchThemeButtonElement.addEventListener("click", this.onClick);
  }
}
new ThemeSwithcer();
