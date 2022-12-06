import {MixpanelProperties} from 'mixpanel-react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Theme, ThemeKey, THEME_STORE_KEY} from '../types';
import {getData, setData} from './DataStore';
import {themes} from './themes';



export function getTheme(themeKey?: ThemeKey): Theme {
  if (themeKey && themes[themeKey].darkColor1) {
    return themes[themeKey];
  }
  return themes.default;
}

export const ThemeContext = React.createContext<{
  theme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
  analyticsTrack: (
    eventName: string,
    properties?: MixpanelProperties | undefined,
  ) => void;
}>({
  theme: 'default',
  setTheme: () => null,
  analyticsTrack: () => null,
});

export function useStoreTheme(
  initTheme: ThemeKey,
): [ThemeKey, (key: ThemeKey) => void] {
  const [theme, setTheme] = useState<ThemeKey>(initTheme);
  useEffect(() => {
    getData(THEME_STORE_KEY).then(themeFromStore => {
      if (themeFromStore) {
        setTheme(themeFromStore as ThemeKey);
      }
    });
  }, []);

  const setThemeToStore = useCallback((themeValue: ThemeKey) => {
    setData(THEME_STORE_KEY, themeValue);
  }, []);

  return [theme, setThemeToStore];
}

export function useThemeObject(): Theme {
  const {theme} = useContext(ThemeContext);
  return getTheme(theme);
}
