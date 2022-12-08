import * as React from 'react';
import {Box, Text, IconButton, VStack, HStack, SunIcon} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import {ThemeKey} from '../types';
import {ThemeContext, useThemeObject} from '../utils/getTheme';
import {themes} from '../utils/themes';

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
      <Text color={themeObject.primaryText} fontSize="sm" mt={1} mb={5}>
        <Text bold>Change theme :</Text>
      </Text>
      <HStack
        alignItems={'center'}
        justifyContent="flex-start"
        accessibilityHint="Change application theme by setting theme options below">
        {themeList.map(themeItem => {
          const itemTheme = themes[themeItem];
          const isSelected = theme === themeItem;
          return (
            <Box
              key={themeItem}
              borderWidth={isSelected ? 3 : 0}
              borderColor={isSelected ? themeObject.primaryText : 'transparent'}
              p={1}
              m={1}
              borderRadius={100}>
              <IconButton
                accessibilityLabel="tap to select the theme"
                borderColor={itemTheme.secondryBG}
                bg={itemTheme.primaryBG}
                borderRadius={100}
                collapsable={true}
                _icon={{size: 'md'}}
                icon={<SunIcon color={itemTheme.primaryText} />}
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
