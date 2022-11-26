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
  props: React.PropsWithChildren<{enWord: string; isExactResults: boolean}>,
) {
  const {enWord, isExactResults} = props;
  return (
    <Box
      mb={5}
      w={'100%'}
      maxWidth={'500px'}
      borderWidth="1"
      borderColor={isExactResults ? 'emerald.500' : 'coolGray.400'}
      shadow="3"
      bg="coolGray.100"
      p="5"
      rounded="8">
      <Flex direction="row">
        <Text
          pt={1}
          pb={1}
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
      </Flex>
      {props.children}
    </Box>
  );
}
