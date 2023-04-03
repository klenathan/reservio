/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                logo: 'Alegreya Sans SC'
            },
            colors: {
                oliveGreen: "#3D550C",
                limeGreen: "#81B622",
                yellowGreen: "#ECF87F",
                midGreen: "#59981A",
            },
            backgroundImage: {
                'authenticate': "url('/assets/background_authenticate.svg')"
            },

        },
    },
    plugins: [],
};
