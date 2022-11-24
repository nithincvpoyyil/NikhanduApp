import * as React from 'react';
import {
  Box,
  Text,
  IconButton,
  SunIcon,
  MoonIcon,
  HamburgerIcon,
  HStack,
} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import {DeviceLightMode} from '../types';

export const vStackProps: InterfaceVStackProps = {
  space: 5,
  alignItems: 'center',
  w: '100%',
  height: '100%',
};

export default function LightMode({
  currentMode,
  changeAppLightMode,
}: {
  currentMode: DeviceLightMode;
  changeAppLightMode: (mode: DeviceLightMode) => void;
}) {
  return (
    <HStack alignItems={'center'} justifyContent="flex-start" m={2}>
      <Box flex={1}>
        <Text color="coolGray.600" fontSize="sm">
          <Text bold>Light</Text>/<Text bold>Dark</Text>/
          <Text bold>Device</Text> theme:
        </Text>
      </Box>
      <IconButton
        mr={2}
        borderColor="coolGray.800"
        borderRadius={100}
        shadow="3"
        borderWidth={1}
        _icon={{size: 'md'}}
        bg={currentMode !== 'light' ? '#ffa' : 'coolGray.700'}
        icon={
          <SunIcon color={currentMode !== 'light' ? 'coolGray.700' : '#ffa'} />
        }
        onPress={() => {
          changeAppLightMode('light');
        }}
      />

      <IconButton
        mr={2}
        borderColor="coolGray.800"
        borderRadius={100}
        borderWidth={1}
        shadow="3"
        _icon={{size: 'md'}}
        bg={currentMode !== 'dark' ? '#ffa' : 'coolGray.700'}
        icon={
          <MoonIcon color={currentMode !== 'dark' ? 'coolGray.700' : '#ffa'} />
        }
        onPress={() => {
          changeAppLightMode('dark');
        }}
      />

      <IconButton
        mr={2}
        borderColor="coolGray.800"
        borderRadius={100}
        borderWidth={1}
        shadow="3"
        _icon={{size: 'md'}}
        bg={currentMode !== 'device' ? '#ffa' : 'coolGray.700'}
        icon={
          <HamburgerIcon
            color={currentMode !== 'device' ? 'coolGray.700' : '#ffa'}
          />
        }
        onPress={() => {
          changeAppLightMode('device');
        }}
      />
    </HStack>
  );
}
