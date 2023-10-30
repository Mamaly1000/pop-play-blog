import useLocalStorage from "@/hooks/useLocalStorage";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
} from "react";
export interface themeInterface {
  header?: string;
  plainText?: string;
  cardBg?: string;
  mainBg?: string;
  btnColor?: string;
  setLocalTheme: Dispatch<
    SetStateAction<Omit<themeInterface, "setLocalTheme">>
  >;
}

const ThemeMainContext = createContext<themeInterface | null>(null);

const ThemeContext = ({ children }: { children: ReactNode }) => {
  const [LocalTheme, setLocalTheme] = useLocalStorage<
    Omit<themeInterface, "setLocalTheme">
  >("pop-play-theme", {
    btnColor: "#D6D46D",
    cardBg: "#434343",
    header: "#F8F8F8",
    mainBg: "linear-gradient(to right, #200122, #6f0000)",
    plainText: "#E6E6E6",
  });

  return (
    <ThemeMainContext.Provider
      value={{
        cardBg: LocalTheme?.cardBg,
        header: LocalTheme?.header,
        mainBg: LocalTheme?.mainBg,
        plainText: LocalTheme?.plainText,
        btnColor: LocalTheme.btnColor,
        setLocalTheme,
      }}
    >
      {children}
    </ThemeMainContext.Provider>
  );
};

export default ThemeContext;
export const useThemeContext = () => {
  return useContext(ThemeMainContext);
};
