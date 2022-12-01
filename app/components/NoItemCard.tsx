import * as React from 'react';
import {Text, CloseIcon, IconButton, HStack, Box} from 'native-base';
import AnimatedSlideUp from "./animatedComponents/AnimatedSlideUp";

export function NoItemCard({
  handleOnPress,
  isError = false,
}: {
  handleOnPress: () => void;
  isError?: boolean;
}) {
  const styles = !isError
    ? {
        bg: 'warning.100',
        iconBg: 'warning.600',
        iconPressed: 'warning.400',
        iconFocused: 'warning.300',
        iconAccessibilityLabel:
          'No results found. Please check words are speeled correctly.',
        text: 'നിങ്ങൾ തിരഞ്ഞ വാക്ക് നിഘണ്ടുവിൽ കാണുന്നില്ല. വാക്കുകൾ ശരിയായി എഴുതിയിട്ടുണ്ടെന്ന് ദയവായി ഉറപ്പാക്കുക.',
        borderColor: 'warning.500',
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

  return (
    <AnimatedSlideUp duration={500} outputRange={10}>
      <Box
        position={'relative'}
        borderWidth={1}
        pl={2}
        pr={2}
        pt={3}
        pb={3}
        rounded={10}
        alignItems={'center'}
        borderColor={styles.borderColor}
        shadow="3"
        borderLeftWidth={10}
        bg={styles.bg}>
        <HStack
          justifyContent={'space-between'}
          alignItems={'flex-start'}
          width="100%">
          <Text
            color="coolGray.500"
            paddingTop={0}
            paddingBottom={1}
            paddingRight={0}
            paddingLeft={1}
            fontWeight="medium"
            fontSize="md"
            accessibilityLabel={styles.iconAccessibilityLabel}>
            {styles.text}
          </Text>
          <IconButton
            borderWidth={1}
            borderColor="light.50"
            bg={styles.iconBg}
            borderRadius={100}
            shadow="3"
            accessibilityLabel={'close message and search again'}
            _icon={{size: 'md', color: 'light.50'}}
            _pressed={{bg: styles.iconPressed}}
            _focus={{bg: styles.iconFocused}}
            icon={<CloseIcon />}
            onPress={handleOnPress}
          />
        </HStack>
      </Box>
    </AnimatedSlideUp>
  );
}
