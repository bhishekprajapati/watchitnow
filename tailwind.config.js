/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      red: "#FC4747",
      yellow: "#F5C518",
      black: "#000",
      blue: "rgb(7, 3, 98)",
      purple: "rgb(60, 16, 83)",
      pink: "rgb(179, 26, 132)",
      "dark-blue": "#10141E",
      "greyish-blue": "#5A698F",
      "semi-dark-blue": "#161D2F",
      white: "#fff",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
