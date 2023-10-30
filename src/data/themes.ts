import { themeInterface } from "@/context/ThemeContext";

export const themes: Omit<themeInterface, "setLocalTheme">[] = [
  {
    btnColor: "#D6D46D",
    cardBg: "#434343",
    header: "#F8F8F8",
    mainBg: "linear-gradient(to right, #200122, #6f0000)",
    plainText: "#E6E6E6",
  },
  {
    btnColor: "#8D72E1",
    cardBg: "#282A3A",
    header: "#F5F7F8",
    mainBg: "linear-gradient(to right, #6441a5, #2a0845)",
    plainText: "#F6F1F1",
  },
  {
    cardBg: "#474E68",
    header: "#FAF0E6",
    mainBg: "linear-gradient(to right, #283048, #859398)",
    plainText: "#B9B4C7",
    btnColor: "#FCFDF2",
  },
];
