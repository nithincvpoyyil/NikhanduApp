import * as React from 'react';
import {
  VStack,
  Center,
  ScrollView,
  Box,
  Text,
  Heading,
  Flex,
} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';

export const vStackProps: InterfaceVStackProps = {
  space: 5,
  alignItems: 'center',
  w: '100%',
  height: '100%',
};

export default function InfoScreen() {
  return (
    <Center>
      <Box height={'20%'} />
      <ScrollView padding={5} height="70%">
        <VStack {...vStackProps}>
          <Center>
            <Heading>
              <Text fontSize="xl">Extra Large</Text>
            </Heading>
            <Text fontSize="md">
              The quick brown fox jumps over the lazy dog" is an
              English-language pangram—a sentence that contains all of the
              letters of the English alphabet. Owing to its existence, Chakra
              was created. The quick brown fox jumps over the lazy dog" is an
              English-language pangram—a sentence that contains all of the
              letters of the English alphabet. Owing to its existence, Chakra
              was created. The quick brown fox jumps over the lazy dog" is an
              English-language pangram—a sentence that contains all of the
              letters of the English alphabet. Owing to its existence, Chakra
              was created.
              <Text highlight>Highlighted</Text>
            </Text>
            <Flex>
              <Text
                mt="2"
                fontSize={12}
                fontWeight="medium"
                color="darkBlue.600">
                Read More
              </Text>
            </Flex>
          </Center>
        </VStack>
      </ScrollView>
    </Center>
  );
}
