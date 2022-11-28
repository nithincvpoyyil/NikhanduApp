import * as React from 'react';
import {Box, Flex, Text} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';

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
  return (
    <Box
      width={'96%'}
      maxWidth="100%"
      mb={5}
      ml="2%"
      borderWidth="1"
      borderColor={'coolGray.100'}
      shadow="3"
      bg="white"
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
          pl={1}
          pr={2}
          bg="#ffb"
          color="coolGray.800"
          mt="0"
          mb="3"
          fontWeight="medium"
          fontSize="2xl">
          {enWord}
        </Text>

        {mlPhonetics ? (
          <>
            <Text color="coolGray.800" fontSize="2xl" p={1}>
              .
            </Text>
            <Text
              pl={1}
              pr={2}
              bg="#ffb"
              color="coolGray.800"
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
