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
        MAIN_PINK: "#FF777E",
        MAIN_RED: "#E64B4B",
        SUB_GREEN_01: "#F4FBF5",
        SUB_GREEN_02: "#E3F0E5",
        SUB_YELLOW: "#FFF8D4",
        SUB_PINK: "#FFC9CC",
        SUB_RED: "#FDA3A3",
        HOVER_PINK: "#edbabd",
        HOVER_YELLOW: "#f9efbd",
        HOVER_LIGHT_GREEN: "#d0e2d3",
        BLACK: "#393939",
        SUB_BLACK: "#595959",
        GRAY: "#C9C9C9",
        UNIMPORTANT_TEXT_01: "#595959",
        UNIMPORTANT_TEXT_02: "#C8C8C8",
      },
      borderWidth: {
        2: "2px",
      },
      borderColor: {
        "custom-gray": "#ccc",
      },
      borderStyle: {
        dashed: "dashed",
      },
      keyframes: {
        ShowUp: {
          from: { opacity: 0, transform: "translate(0px, 5px)" },
          to: { opacity: 1, transform: "translate(0px, 0px)" },
        },
        FadeIn: {
          from: { opacity: 0, transform: "translate(-50%, -40%)" },
          to: { opacity: 1, transform: "translate(-50%, -50%)" },
        },
        FadeOut: {
          from: { opacity: 1, transform: "translate(-50%, -50%)" },
          to: { opacity: 0, transform: "translate(-50%, -40%)" },
        },
      },
      animation: {
        showUp: "ShowUp 0.7s ease-in-out",
        modalOpen: "FadeIn 0.3s ease-in-out",
        modalClose: "FadeOut 0.3s ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
