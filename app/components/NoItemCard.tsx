import * as React from 'react';
import {Text, CloseIcon, IconButton, HStack, Box} from 'native-base';
import AnimatedSlideUp from './animatedComponents/AnimatedSlideUp';
import {useThemeObject} from '../utils/getTheme';
import {Theme} from '../types';
type Props = {
  handleOnPress: () => void;
  isError?: boolean;
};

const getText = (isError: boolean, theme: Theme) => {
  return !isError
    ? {
        bg: theme.lightBG,
        iconBg: theme.lightBG,
        iconPressed: theme.primaryBG,
        iconFocused: theme.primaryBG,
        iconAccessibilityLabel:
          'No results found. Please check words are speeled correctly.',
        text: 'നിങ്ങൾ തിരഞ്ഞ വാക്ക് നിഘണ്ടുവിൽ കാണുന്നില്ല. വാക്കുകൾ ശരിയായി എഴുതിയിട്ടുണ്ടെന്ന് ദയവായി ഉറപ്പാക്കുക.',
        borderColor: theme.lightBG,
      }
    : {
        bg: 'error.50',
        iconBg: 'error.600',
        iconPressed: 'error.400',
        iconFocused: 'error.300',
        iconAccessibilityLabel:
          'Unable to find the result. some error had happend while searching, please try again.',
        text: 'ഞങ്ങളോട് ക്ഷമിക്കൂ, ചില സാങ്കേതിക പ്രശ്‌നങ്ങൾ കാരണം, ആപ്പിന് ഫലങ്ങൾ കണ്ടെത്താൻ കഴിയുന്നില്ല.\nദയവായി വീണ്ടും ശ്രമിക്കുക.',
        borderColor: 'error.500',
      };
};
export function NoItemCard({handleOnPress, isError = false}: Props) {
  const theme = useThemeObject();
  const styles = getText(isError, theme);
  const [uuid] = React.useState<number>(Date.now());

  return (
    <AnimatedSlideUp duration={800} outputRange={20}>
      <Box
        position={'relative'}
        borderWidth={1}
        pl={3}
        pr={2}
        pt={3}
        pb={3}
        rounded={10}
        alignItems={'center'}
        borderColor={theme.lightBG}
        shadow="3"
        bg={theme.lightBG}>
        <HStack
          justifyContent={'center'}
          alignItems={'flex-start'}
          pl={5}
          pr={5}
          pt={1}
          pb={1}>
          <Text
            accessibilityLabel={styles.iconAccessibilityLabel}
            color={theme.darkColor1}
            flexGrow={1}
            p={2}
            fontWeight="medium"
            fontSize="md">
            {styles.text}
          </Text>
          <IconButton
            accessibilityLabel={'close message and search again'}
            borderWidth={1}
            borderColor={theme.primaryBG}
            bg={theme.primaryBG}
            borderRadius={100}
            shadow="3"
            _icon={{size: 'md', color: theme.primaryText}}
            _pressed={{
              bg: theme.primaryText,
              _icon: {color: theme.primaryBG},
            }}
            _focus={{
              bg: theme.primaryText,
              _icon: {color: theme.primaryBG},
            }}
            icon={<CloseIcon key={uuid} />}
            onPress={handleOnPress}
          />
        </HStack>
      </Box>
    </AnimatedSlideUp>
  );
}
