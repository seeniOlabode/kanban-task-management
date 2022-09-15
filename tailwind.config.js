const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "kanban-main-purple": "#635FC7",
        "kanban-main-purple-hover": "#A8A4FF",
        "kanban-black": "#000112",
        "kanban-very-dark-grey": "#20212C",
        "kanban-dark-grey": "#2B2C37",
        "kanban-lines-dark": "#3E3F4E",
        "kanban-medium-grey": "#828FA3",
        "kanban-lines-light": "#E4EBFA",
        "kanban-light-grey": "#F4F7FD",
        "kanban-white": "#FFFFFF",
        "kanban-red": "#EA5555",
        "kanban-red-hover": "#FF9898",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
