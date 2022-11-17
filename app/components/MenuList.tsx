import * as React from 'react';
import {
  Box,
  CloseIcon,
  IconButton,
  InfoOutlineIcon,
  MoonIcon,
  Stagger,
  SunIcon,
  ThreeDotsIcon,
  useDisclose,
} from 'native-base';
import {getData} from '../utils/DataStore';

const DARK_MODE_FLAG = '@dark-mode-flag-value';

export const MenuList = (props: {onInfoBtnClick: () => void}) => {
  const {onInfoBtnClick = () => null} = props;
  const {isOpen, onToggle} = useDisclose();
  const [deviceMode, setIsDeviceMode] = React.useState<
    'dark' | 'light' | 'device'
  >('dark');

  const toggleDarkMode = () => {
    if (deviceMode === 'light') {
      setIsDeviceMode('dark');
    } else {
      setIsDeviceMode('light');
    }
  };

  React.useEffect(() => {
    getData(DARK_MODE_FLAG).then(
      mode => {
        //@ts-ignore
        return setIsDeviceMode(mode || 'device');
      },
      () => {
        setIsDeviceMode('device');
      },
    );
  }, []);

  const deviceModeIcon =
    deviceMode === 'light' ? (
      <SunIcon color={'white'} key="sun" />
    ) : (
      <MoonIcon color={'white'} key="moon" />
    );

  const openCloseIcon = isOpen ? (
    <CloseIcon color="white" key="white" />
  ) : (
    <ThreeDotsIcon color="white" key="dark" />
  );

  return (
    <Box zIndex={100}>
      <Box alignItems="center" minH={100}>
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}>
          <IconButton
            onPress={toggleDarkMode}
            mb={2}
            shadow={2}
            variant="outline"
            rounded="full"
            size="lg"
            icon={deviceModeIcon}
            bg="info.400"
            _pressed={{bg: 'info.500'}}
            borderWidth={0}
            key="dv-mode-icon"
          />
          <IconButton
            shadow={2}
            mb={2}
            variant="outline"
            rounded="full"
            size="lg"
            bg="info.400"
            _pressed={{bg: 'info.500'}}
            icon={<InfoOutlineIcon color={'white'} />}
            borderWidth={0}
            key="info-mode-icon"
            onPress={onInfoBtnClick}
          />
        </Stagger>
      </Box>
      <IconButton
        shadow={3}
        variant="outline"
        rounded="full"
        size="lg"
        onPress={onToggle}
        bg="emerald.500"
        icon={openCloseIcon}
        _pressed={{bg: 'emerald.400'}}
        borderWidth={0}
        key="open-close-icon"
      />
    </Box>
  );
};
