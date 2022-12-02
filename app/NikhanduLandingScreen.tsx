import * as React from 'react';
import {NativeBaseProvider, Box, Fab} from 'native-base';
import {MenuList} from './components/MenuList';
import DictScreen from './DictScreen';
import InfoScreen from './InfoScreen';
import {ThemeContext, ThemeKey, useStoreTheme} from './utils/getTheme';

export default function NikhanduLandingScreen() {
  const [currentScreen, setCurrentScreen] = React.useState<'info' | 'dict'>(
    'dict',
  );
  const [theme, setTheme] = React.useState<ThemeKey>('default');
  const [themeFromStore] = useStoreTheme(theme);

  const onPressCloseBtn = () => {
    setCurrentScreen('dict');
  };
  const onPressMenu = () => {
    setCurrentScreen('info');
  };

  React.useEffect(() => {
    setTheme(themeFromStore);
  }, [themeFromStore]);

  return (
    <NativeBaseProvider>
      <ThemeContext.Provider value={{theme: theme, setTheme}}>
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
