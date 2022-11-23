import * as React from 'react';
import {
  HStack,
  Text,
  WarningOutlineIcon,
  CloseIcon,
  IconButton,
} from 'native-base';

export function NoItemCard({
  handleOnPress,
  isError = false,
}: {
  handleOnPress: () => void;
  isError?: boolean;
}) {
  const styles = !isError
    ? {
        bg: 'warning.200',
        iconBg: 'warning.600',
        iconPressed: 'warning.400',
        iconFocused: 'warning.300',
        iconAccessibilityLabel:
          'No results found. Please check words are speeled correctly.',
        text: 'നിങ്ങൾ തിരഞ്ഞ വാക്ക് നിഘണ്ടുവിൽ കാണുന്നില്ല. വാക്കുകൾ ശരിയായി എഴുതിയിട്ടുണ്ടെന്ന് ദയവായി ഉറപ്പാക്കുക.',
      }
    : {
        bg: 'error.200',
        iconBg: 'error.600',
        iconPressed: 'error.400',
        iconFocused: 'error.300',
        iconAccessibilityLabel: 'Something bad happend, please try again',
        text: 'Something bad happend ! Please try again.',
      };

  return (
    <HStack
      position={'relative'}
      m={2}
      borderWidth={1}
      pl={3}
      pr={'1.5'}
      pt={5}
      pb={2}
      rounded={10}
      alignItems={'center'}
      borderColor="coolGray.300"
      shadow="3"
      bg={styles.bg}>
      <WarningOutlineIcon
        size="lg"
        mr={1}
        color="coolGray.500"
        accessible={false}
      />

      <Text
        flex={1}
        color="coolGray.500"
        paddingTop={0}
        paddingBottom={1}
        paddingRight={2}
        paddingLeft={3}
        fontWeight="medium"
        fontSize="md"
        accessibilityLabel={styles.iconAccessibilityLabel}>
        {styles.text}
      </Text>

      <IconButton
        position="absolute"
        top="-15"
        right="-15"
        borderWidth={1}
        borderColor="coolGray.300"
        bg={styles.iconBg}
        borderRadius={100}
        shadow="3"
        padding={'2'}
        accessibilityLabel={styles.iconAccessibilityLabel}
        _icon={{size: 'md', color: 'light.50'}}
        _pressed={{bg: styles.iconPressed}}
        _focus={{bg: styles.iconFocused}}
        icon={<CloseIcon />}
        onPress={handleOnPress}
      />
    </HStack>
  );
}
