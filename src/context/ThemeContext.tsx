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
    cardBg: "#474E68",
    header: "#FAF0E6",
    mainBg: "linear-gradient(to right, #283048, #859398)",
    plainText: "#B9B4C7",
    btnColor: "#FCFDF2",
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
