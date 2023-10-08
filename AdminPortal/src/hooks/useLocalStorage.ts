import { useState } from "react";

export const useLocalStorage = <T>(keyName: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (_) {
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (_) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue] as const;
};
