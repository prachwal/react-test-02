import { useEffect, useState } from 'react';
import type { ThemeType } from '../types';
import { getNextTheme, isValidTheme } from '../types';
import { notification } from '../components';


const THEME_STORAGE_KEY = 'theme';
const DEFAULT_THEME: ThemeType = 'light';

/**
 * Bezpieczne odczytanie motywu z localStorage z walidacją
 */
function getStoredTheme(): ThemeType {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored !== null && isValidTheme(stored)) {
      return stored as ThemeType;
    }
  } catch (error) {
    notification.warn(`Failed to read theme from localStorage: ${error}`);
  }
  return DEFAULT_THEME;
}

/**
 * Bezpieczny zapis motywu do localStorage
 */
function setStoredTheme(theme: ThemeType): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    notification.error(`Failed to save theme to localStorage: ${error}`);
  }
}

/**
 * Określa efektywny motyw (light/dark) na podstawie preferencji
 */
function getEffectiveTheme(themeType: ThemeType): 'light' | 'dark' {
  if (themeType === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return themeType;
}

export function UseThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeType>(getStoredTheme);

  // Efekt dla obsługi zmian motywu systemowego
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      // Reaguj tylko gdy aktualny motyw to 'auto'
      setTheme(current => {
        if (current === 'auto') {
          // Wymuszenie re-renderu przez zmianę referencji
          return 'auto';
        }
        return current;
      });
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Efekt dla aplikacji motywu i zapisywania do localStorage
  useEffect(() => {
    const effectiveTheme = getEffectiveTheme(theme);
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    setStoredTheme(theme);

    notification.info(`Theme: ${theme}${theme === 'auto' ? ` (${effectiveTheme})` : ''}`);
  }, [theme]);

  const nextTheme = (currentTheme: ThemeType): ThemeType => {
    return getNextTheme(currentTheme);
  };

  return {
    theme,
    setTheme,
    nextTheme,
    effectiveTheme: getEffectiveTheme(theme)
  };
}
