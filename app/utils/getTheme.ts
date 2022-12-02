import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Theme, ThemeKey} from '../types';
import {getData, setData} from './DataStore';

const themeStoreKey = '@NikhanduAppTheme';
export const themes: Record<ThemeKey, Theme> = {
  default: {
    primaryBG: '#376AED',
    primaryText: '#ffffff',
    secondryBG: '#E6EAF1',
    secondaryText: '#4b5563',
    tertiaryBG: '#fff',
    tertiaryText: '#000',
    lightBG: '#f9fafb',
    lightText: '#1f2937',
    darkColor1: '#0D253C',
    darkColor2: '#2151CD',
    lightColor1: '#ffffff',
    lightColor2: '#ffffff',
  },
  indigo: {
    primaryBG: '#083D77',
    primaryText: '#C8E2F9',
    secondryBG: '#ecf5fd',
    secondaryText: '#082B49',
    tertiaryBG: '#fff',
    tertiaryText: '#000',
    lightBG: '#f9fafb',
    lightText: '#062037',
    darkColor1: '#0E4B81',
    darkColor2: '#1261A5',
    lightColor1: '#ffffff',
    lightColor2: '#ffffff',
  },
  green: {
    primaryBG: '#339989',
    primaryText: '#ddf8f4',
    secondryBG: '#86DEB7',
    secondaryText: '#1C2815',
    tertiaryBG: '#fff',
    tertiaryText: '#000',
    lightBG: '#CFF2E2',
    lightText: '#262417',
    darkColor1: '#2F4323',
    darkColor2: '#56B38C',
    lightColor1: '#ffffff',
    lightColor2: '#ffffff',
  },
  yellow: {
    primaryBG: '#FFAD0A',
    primaryText: '#1c1c1c',
    secondryBG: '#FFEDC2',
    secondaryText: '#3D2900',
    tertiaryBG: '#fff',
    tertiaryText: '#000',
    lightBG: '#FFFFEB',
    lightText: '#1f2937',
    darkColor1: '#340B09',
    darkColor2: '#063B4B',
    lightColor1: '#ffffff',
    lightColor2: '#ffffff',
  },
  white: {
    primaryBG: '#f9f9f9',
    primaryText: '#1c1c1c',
    secondryBG: '#B3E3FB',
    secondaryText: '#03343A',
    tertiaryBG: '#fff',
    tertiaryText: '#000',
    lightBG: '#fff',
    lightText: '#000',
    darkColor1: '#000',
    darkColor2: '#063B4B',
    lightColor1: '#ffffff',
    lightColor2: '#ffffff',
  },
  powersave: {
    primaryBG: '#376AED',
    primaryText: '#ffffff',
    secondryBG: '#E6EAF1',
    secondaryText: '#4b5563',
    tertiaryBG: '#fff',
    tertiaryText: '#000',
    lightBG: '#f9fafb',
    lightText: '#1f2937',
    darkColor1: '#0D253C',
    darkColor2: '#2151CD',
    lightColor1: '#ffffff',
    lightColor2: '#ffffff',
  },
};

export function getTheme(themeKey?: ThemeKey): Theme {
  if (themeKey && themes[themeKey].darkColor1) {
    return themes[themeKey];
  }
  return themes.default;
}

export const ThemeContext = React.createContext<{
  theme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
}>({
  theme: 'default',
  setTheme: () => null,
});

export function useStoreTheme(
  initTheme: ThemeKey,
): [ThemeKey, (key: ThemeKey) => void] {
  const [theme, setTheme] = useState<ThemeKey>(initTheme);
  useEffect(() => {
    getData(themeStoreKey).then(themeFromStore => {
      if (themeFromStore) {
        setTheme(themeFromStore as ThemeKey);
      }
    });
  }, []);

  const setThemeToStore = useCallback((themeValue: ThemeKey) => {
    setData(themeStoreKey, themeValue);
  }, []);

  return [theme, setThemeToStore];
}

export function useThemeObject(): Theme {
  const {theme} = useContext(ThemeContext);
  return getTheme(theme);
}
