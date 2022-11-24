import * as React from 'react';
import {NativeBaseProvider, Box, Fab} from 'native-base';
import {MenuList} from './components/MenuList';
import DictScreen from './DictScreen';
import InfoScreen from './InfoScreen';
import {getData} from './utils/DataStore';
import {DeviceLightMode} from './types';

const DARK_MODE_FLAG = '@dark-mode-flag-value';

export default function NikhanduLandingScreen() {
  const [currentScreen, setCurrentScreen] = React.useState<'info' | 'dict'>(
    'dict',
  );
  const [_, setIsDeviceMode] = React.useState<DeviceLightMode>('dark');

  const onPressCloseBtn = () => {
    setCurrentScreen('dict');
  };
  const onPressMenu = () => {
    setCurrentScreen('info');
  };

  React.useEffect(() => {
    getData(DARK_MODE_FLAG).then(
      mode => {
        setIsDeviceMode(mode as DeviceLightMode);
      },
      () => {
        setIsDeviceMode('device');
      },
    );
  }, []);

  return (
    <NativeBaseProvider>
      <Box zIndex={100}>
        {currentScreen === 'dict' ? <MenuList onPress={onPressMenu} /> : null}
      </Box>
      {currentScreen === 'info' ? (
        <InfoScreen
          onPressCloseBtn={onPressCloseBtn}
          changeAppLightMode={setIsDeviceMode}
        />
      ) : (
        <DictScreen />
      )}
    </NativeBaseProvider>
  );
}
