/** @type {import('tailwindcss').Config} */
module.exports = {

    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [
        require('tailwind-scrollbar-hide'),
        require('@tailwindcss/line-clamp'),
    ],
    theme: {
        extend: {
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
            },
            backgroundImage: {
                authenticate: "url('/assets/background_authenticate.svg')",
            },
        },
    },
};
