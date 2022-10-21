import * as React from 'react';
import {VStack, Center, Skeleton, HStack} from 'native-base';

export default function ListLoader() {
  return (
    <Center
      w="80%"
      borderWidth="1"
      _dark={{
        borderColor: 'coolGray.500',
      }}
      _light={{
        borderColor: 'coolGray.200',
      }}>
      <HStack
        w="100%"
        maxW="400"
        space={8}
        rounded="md"
        p="4"
        borderBottomWidth={1}
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton flex="1" h="100" rounded="md" startColor="coolGray.100" />
        <VStack flex="3" space="4">
          <Skeleton h="30" startColor="amber.100" />
          <Skeleton.Text />
        </VStack>
      </HStack>
      <HStack
        w="100%"
        maxW="400"
        borderBottomWidth={1}
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
        space={8}
        rounded="md"
        p="4">
        <Skeleton flex="1" h="100" rounded="md" startColor="coolGray.100" />
        <VStack flex="3" space="4">
          <Skeleton h="30" startColor="amber.100" />
          <Skeleton.Text />
        </VStack>
      </HStack>
      <HStack w="100%" maxW="400" space={8} rounded="md" p="4">
        <Skeleton flex="1" h="100" rounded="md" startColor="coolGray.100" />
        <VStack flex="3" space="4">
          <Skeleton h="30" startColor="amber.100" />
          <Skeleton.Text />
        </VStack>
      </HStack>
    </Center>
  );
}
