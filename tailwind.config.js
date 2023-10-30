module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        atkinson: ["Atkinson Hyperlegible"],
      },
      fontSize: {
        "page-header": "34px",
        "section-header-max": "26px",
        "section-header-min": "18px",
        "group-header-max": "18px",
        "group-header-min": "14px",
        "paragraph-max": "16px",
        "paragraph-min": "12px",
      },
      colors: {
        "max-transparent": "rgba(0 0 0 /.3)",
        "mid-transparent": "rgba(0 0 0 /.6)",
        "min-transparent": "rgba(0 0 0 /.9)",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
