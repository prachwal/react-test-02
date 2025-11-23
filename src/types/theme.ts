export type RealThemeType = 'light' | 'dark';
export type ThemeType =  RealThemeType | 'auto';
export const themes: ThemeType[] = ['light', 'dark', 'auto'];

export const getNextTheme = (currentTheme: ThemeType): ThemeType => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    return themes[nextIndex];
};