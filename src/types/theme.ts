export type RealThemeType = 'light' | 'dark';
export type ThemeType = RealThemeType | 'auto';

export const themes: readonly ThemeType[] = ['light', 'dark', 'auto'] as const;

/**
 * Zwraca następny motyw w kolejności cyklicznej
 */
export const getNextTheme = (currentTheme: ThemeType): ThemeType => {
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  return themes[nextIndex];
};

/**
 * Sprawdza czy wartość jest poprawnym motywem
 */
export const isValidTheme = (value: unknown): value is ThemeType => {
  return typeof value === 'string' && themes.includes(value as ThemeType);
};
