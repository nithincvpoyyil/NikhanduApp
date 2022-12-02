import * as React from 'react';
import {
  Box,
  Text,
  IconButton,
  SunIcon,
  MoonIcon,
  HamburgerIcon,
  VStack,
  HStack,
} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import {ThemeKey} from '../types';
import {ThemeContext, themes, useThemeObject} from '../utils/getTheme';

export const vStackProps: InterfaceVStackProps = {
  space: 5,
  alignItems: 'center',
  w: '100%',
  height: '100%',
};

export default function LightMode() {
  const themeList: Array<ThemeKey> = [
    'default',
    'green',
    'yellow',
    'powersave',
    'indigo',
    'white',
  ];
  const {theme, setTheme} = React.useContext(ThemeContext);
  const themeObject = useThemeObject();

  return (
    <VStack alignItems={'flex-start'} justifyContent="flex-start" m={2}>
      <Text color={themeObject.primaryText} fontSize="sm" m={10}>
        <Text bold>Change app theme</Text>
      </Text>
      <HStack alignItems={'center'} justifyContent="flex-start">
        {themeList.map(themeItem => {
          const itemTheme = themes[themeItem];
          const isSelected = theme === themeItem;
          return (
            <Box
              key={themeItem}
              borderWidth={isSelected ? 2 : 0}
              borderColor={themeObject.primaryText}
              p={1}
              m={1}
              borderRadius={100}>
              <IconButton
                borderColor={itemTheme.secondryBG}
                bg={'#fff'}
                borderRadius={100}
                collapsable={true}
                _icon={{size: 'md'}}
                icon={
                  <MoonIcon
                    color={
                      isSelected ? itemTheme.primaryBG : itemTheme.secondryBG
                    }
                  />
                }
                onPress={() => {
                  setTheme(themeItem);
                }}
              />
            </Box>
          );
        })}
      </HStack>
    </VStack>
  );
}
