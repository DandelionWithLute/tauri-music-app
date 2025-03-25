/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "wk-md": ["wk-md","sans-serif"],
      },
    },
  },
  plugins: [],
};
