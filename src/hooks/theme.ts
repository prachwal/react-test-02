import { useEffect, useState } from "react";
import { getNextTheme, RealThemeType, ThemeType } from "../types";

export function UseThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeType>("light");

  // Funkcja pomocnicza do określania aktualnego motywu na podstawie preferencji systemowych
  const getEffectiveTheme = (themeType: ThemeType): RealThemeType => {
    if (themeType === "auto") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    }
    return themeType;
  };

  useEffect(() => {
    // Sprawdzenie preferencji początkowo - z localStorage lub systemowych
    const savedTheme = localStorage.getItem("theme") as ThemeType | null;

    // Użyj zapisanej preferencji lub domyślnej (light)
    setTheme(savedTheme || "light");

    // Nasłuchiwanie na zmiany preferencji systemowych
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (_e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme") as ThemeType | null;
      // Jeśli użytkownik ma ustawiony tryb auto lub brak zapisanej preferencji, podążaj za systemem
      if (savedTheme === "auto" || !savedTheme) {
        setTheme("auto");
      }
    };

    // Obsługa zmian (nowoczesna)
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Obsługa zmian (legacy dla starszych przeglądarek)
    if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemThemeChange);
    }

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  useEffect(() => {
    // Ustaw atrybut data-theme na elemencie HTML z uwzględnieniem trybu auto
    const effectiveTheme = getEffectiveTheme(theme);
    document.documentElement.setAttribute("data-theme", effectiveTheme);

    // Zapisz w localStorage
    localStorage.setItem("theme", theme);

    console.log("Theme set to:", theme, "(effective:", effectiveTheme + ")");
  }, [theme]);

  function nextTheme(theme: ThemeType): ThemeType {
    return getNextTheme(theme);
  }

  return { theme, setTheme, nextTheme };
}
