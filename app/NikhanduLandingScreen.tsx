import * as React from 'react';
import {NativeBaseProvider, Box, Fab} from 'native-base';
import {MenuList} from './components/MenuList';
import DictScreen from './DictScreen';
import InfoScreen from './InfoScreen';

export default function NikhanduLandingScreen() {
  const [currentScreen, setCurrentScreen] = React.useState<'info' | 'dict'>(
    'dict',
  );

  const onInfoBtnClick = () => {
    currentScreen === 'info'
      ? setCurrentScreen('dict')
      : setCurrentScreen('info');
  };

  return (
    <NativeBaseProvider>
      <Box zIndex={100}>
        <Fab
          bg={'transparent'}
          placement="bottom-right"
          label={<MenuList onInfoBtnClick={onInfoBtnClick} />}
          _pressed={{bg: 'transparent'}}
        />
      </Box>
      {currentScreen === 'info' ? <InfoScreen /> : <DictScreen />}
    </NativeBaseProvider>
  );
}
