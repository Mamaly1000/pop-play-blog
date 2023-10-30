import { useState, useEffect } from "react";
const useLocalStorage = <T,>(key: string, initValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    const jsonVlaue =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (jsonVlaue === null) {
      if (typeof initValue === "function") {
        return (initValue as () => T)();
      } else {
        return initValue;
      }
    } else {
      return JSON.parse(jsonVlaue);
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
};

export default useLocalStorage;
