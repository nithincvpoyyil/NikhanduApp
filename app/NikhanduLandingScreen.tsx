import * as React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import {MenuList} from './components/MenuList';
import DictScreen from './DictScreen';
import InfoScreen from './InfoScreen';
import {ThemeContext, useStoreTheme} from './utils/getTheme';
import {ThemeKey} from './types';
import {useAnalytics} from './utils/useAnalytics';
import {events, MIXPANEL_TOKEN} from './utils/analyticsConstants';

export default function NikhanduLandingScreen() {
  const [currentScreen, setCurrentScreen] = React.useState<'info' | 'dict'>(
    'dict',
  );
  const [theme, setTheme] = React.useState<ThemeKey>('default');
  const [themeFromStore, setThemeToStore] = useStoreTheme(theme);
  const [analyticsTrack] = useAnalytics(MIXPANEL_TOKEN);

  const onPressCloseBtn = () => {
    setCurrentScreen('dict');
  };
  const onPressMenu = () => {
    analyticsTrack(events.SETTINGS_SCREEN_OPENED);
    setCurrentScreen('info');
  };

  React.useEffect(() => {
    setTheme(themeFromStore);
    analyticsTrack(events.THEME_CHANGE, {theme: themeFromStore});
  }, [themeFromStore]);

  // sync code for both context and store
  const updateTheme = (themeVal: ThemeKey) => {
    setTheme(themeVal);
    setThemeToStore(themeVal);
  };

  return (
    <NativeBaseProvider>
      <ThemeContext.Provider
        value={{theme: theme, setTheme: updateTheme, analyticsTrack}}>
        <Box zIndex={100}>
          {currentScreen === 'dict' ? <MenuList onPress={onPressMenu} /> : null}
        </Box>
        {currentScreen === 'info' ? (
          <InfoScreen
            onPressCloseBtn={onPressCloseBtn}
            changeAppLightMode={() => null}
          />
        ) : (
          <DictScreen />
        )}
      </ThemeContext.Provider>
    </NativeBaseProvider>
  );
}
