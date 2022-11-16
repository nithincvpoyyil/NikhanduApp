import * as React from 'react';
import {
  VStack,
  Center,
  ScrollView,
  Box,
  Text,
  Heading,
  Link,
  HStack,
  Badge,
  Spacer,
  Flex,
} from 'native-base';
import {vStack2Props} from './NikhanduLandingScreenStyles';
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
            <Link href="https://nativebase.io" isExternal width={'100%'}>
              <Box
                w={'100%'}
                maxWidth={'500px'}
                borderWidth="1"
                borderColor="coolGray.300"
                shadow="3"
                bg="coolGray.100"
                p="5"
                rounded="8">
                <HStack alignItems="center">
                  <Badge
                    colorScheme="darkBlue"
                    _text={{
                      color: 'white',
                    }}
                    variant="solid"
                    rounded="4">
                    Open Source
                  </Badge>
                  <Spacer />
                  <Text fontSize={10} color="coolGray.800">
                    2020
                  </Text>
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl">
                  NativeBase v3
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                  NativeBase is a component library that enables devs to build
                  universal design systems.
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
              </Box>
            </Link>
          </Center>
        </VStack>
      </ScrollView>
    </Center>
  );
}
