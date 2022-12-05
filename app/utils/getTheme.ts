import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Theme, ThemeKey} from '../types';
import {getData, setData} from './DataStore';
import {themes} from './themes';

const themeStoreKey = '@NikhanduAppTheme';

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
