import * as React from 'react';
import {Box, Flex, Text} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import {useThemeObject} from '../../utils/getTheme';

export const vStackProps: InterfaceVStackProps = {
  space: 5,
  alignItems: 'center',
  w: '100%',
  height: '100%',
};

export default function DictItemCard(
  props: React.PropsWithChildren<{
    enWord: string;
    mlPhonetics: string;
    isExactResults: boolean;
  }>,
) {
  const {enWord, mlPhonetics} = props;

  const theme = useThemeObject();
  return (
    <Box
      width={'96%'}
      maxWidth="100%"
      mb={5}
      ml="2%"
      borderWidth="1"
      borderColor={theme.tertiaryBG}
      bg={theme.tertiaryBG}
      shadow="3"
      p="5"
      rounded="8">
      <Flex
        direction="row"
        wrap="wrap"
        alignItems={'center'}
        justifyContent={'flex-start'}
        pt={1}
        pb={1}>
        <Text
          pl={2}
          pr={2}
          bg={theme.darkColor1}
          color={theme.lightColor1}
          mt="0"
          mb="3"
          fontWeight="medium"
          fontSize="2xl">
          {enWord}
        </Text>

        {mlPhonetics ? (
          <>
            <Box
              ml={2}
              mr={2}
              w={1.5}
              h={1.5}
              borderWidth={1}
              bg={theme.darkColor1}
              borderColor={theme.darkColor1}
              style={{transform: [{rotate: '45deg'}]}}
            />
            <Text
              pl={2}
              pr={2}
              bg={theme.darkColor1}
              color={theme.lightColor1}
              mt="0"
              mb="3"
              fontWeight="medium"
              fontSize="2xl">
              {mlPhonetics}
            </Text>
          </>
        ) : null}
      </Flex>
      {props.children}
    </Box>
  );
}
