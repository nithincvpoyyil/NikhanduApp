import * as React from 'react';
import {Box, Text} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';

export const vStackProps: InterfaceVStackProps = {
  space: 5,
  alignItems: 'center',
  w: '100%',
  height: '100%',
};

export default function DictItemCard(
  props: React.PropsWithChildren<{enWord: string}>,
) {
  const {enWord} = props;
  return (
    <Box
      mb={5}
      w={'100%'}
      maxWidth={'500px'}
      borderWidth="1"
      borderColor="coolGray.300"
      shadow="3"
      bg="coolGray.100"
      p="5"
      rounded="8">
      <Text
        color="coolGray.800"
        mt="0"
        mb="3"
        fontWeight="medium"
        fontSize="2xl">
        {enWord}
      </Text>
      {props.children}
    </Box>
  );
}
