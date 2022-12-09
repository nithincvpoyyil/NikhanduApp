import * as React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import {MenuList} from './components/MenuList';
import DictScreen from './DictScreen';
import InfoScreen from './InfoScreen';
import {getTheme, ThemeContext, useStoreTheme} from './utils/getTheme';
import {ThemeKey} from './types';
import {useAnalytics, useAnalyticsFlag} from './utils/useAnalytics';
import {events, MIXPANEL_TOKEN} from './utils/analyticsConstants';
import {WithSplashScreen} from './components/Keybaord';

export default function NikhanduLandingScreen() {
  const [currentScreen, setCurrentScreen] = React.useState<'info' | 'dict'>(
    'dict',
  );
  const [theme, setTheme] = React.useState<ThemeKey>('default');
  const [isAppReady, setAppReady] = React.useState<boolean>(false);
  const [themeFromStoreState, themeFromStore, setThemeToStore] =
    useStoreTheme(theme);
  const [analyticsTrack] = useAnalytics(MIXPANEL_TOKEN);
  const analyticsFlag = useAnalyticsFlag();

  const onPressCloseBtn = () => {
    setCurrentScreen('dict');
  };

  const onPressMenu = () => {
    setCurrentScreen('info');
  };

  React.useEffect(() => {
    setTheme(themeFromStore);
    if (themeFromStoreState === 'loaded') {
      setTimeout(() => {
        setAppReady(true);
      }, 500);
    }
  }, [themeFromStore, themeFromStoreState]);

  // sync code for both context and store
  const updateTheme = (themeVal: ThemeKey) => {
    setTheme(themeVal);
    setThemeToStore(themeVal);
    if (analyticsFlag) {
      analyticsTrack(events.THEME_CHANGE, {theme: themeVal});
    }
  };

  const primaryBGColor = getTheme(theme).primaryBG;

  return (
    <NativeBaseProvider>
      <ThemeContext.Provider
        value={{theme: theme, setTheme: updateTheme, analyticsTrack}}>
        <WithSplashScreen
          isAppReady={isAppReady}
          theme={{primaryBG: primaryBGColor}}>
          <>
            <Box zIndex={100}>
              {currentScreen === 'dict' ? (
                <MenuList onPress={onPressMenu} />
              ) : null}
            </Box>
            {currentScreen === 'info' ? (
              <InfoScreen onPressCloseBtn={onPressCloseBtn} />
            ) : (
              <DictScreen />
            )}
          </>
        </WithSplashScreen>
      </ThemeContext.Provider>
    </NativeBaseProvider>
  );
}
