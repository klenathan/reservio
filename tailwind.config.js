/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': "0.4rem",
      },
      fontFamily: {
        logo: "Alegreya Sans SC",
      },
      colors: {
        oliveGreen: "#3D550C",
        limeGreen: "#81B622",
        yellowGreen: "#ECF87F",
        midGreen: "#59981A",
        pendingYellow: "#EEBC3C",
        rejectedRed: "#D20D3C",
        acceptedBlue: "#2659C3",
        completedGreen: "#5E9C1B",
        heavyRed: "#D20D3C",
        lightRed: "#FF2C5E",
      },
      backgroundImage: {
        authenticate: "url('/assets/background_authenticate.svg')",
      },
      animation: {
        fadeInDown: "transition-all ease-in-out duration-300",
      },
      screens: {
        "2k": "2048px",
      },
    },
  },
  darkMode: "class",
};
