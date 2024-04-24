/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        MAIN_GREEN: "#186D41",
        MAIN_YELLOW: "#FEE970",
        MAIB_PINK: "#FF777E",
        MAIN_RED: "#E64B4B",
        SUB_GREEN_01: "#F4FBF5",
        SUB_GREEN_02: "#E3F0E5",
        SUB_YELLOW: "#FFF8D4",
        SUB_PINK: "#FFC9CC",
        SUB_RED: "#FDA3A3",
        BLACK: "#404040",
        SUB_BLACK: "#595959",
        GRAY: "#FAFAFA",
        UNIMPORTANT_TEXT_01: "#595959",
        UNIMPORTANT_TEXT_02: "#C8C8C8",
      },
    },
  },
  plugins: [],
};
