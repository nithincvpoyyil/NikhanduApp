import * as React from 'react';
import {Text, VStack, Box, FlatList, Spacer} from 'native-base';
import {data} from './stub';

export default function DictListView() {
  return (
    <FlatList
      w="100%"
      data={data}
      renderItem={({item}) => (
        <Box
          width={'100%'}
          w="100%"
          borderBottomWidth="1"
          _dark={{
            borderColor: 'muted.50',
          }}
          borderColor="muted.800"
          pl={['0', '4']}
          pr={['0', '5']}
          py="2">
          <VStack justifyContent="space-between" w="100%">
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color="coolGray.800"
              bold>
              {item.fullName}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              {item.recentText}
            </Text>
            <Spacer />
            <Text
              fontSize="xs"
              _dark={{
                color: 'warmGray.50',
              }}
              color="coolGray.800"
              alignSelf="flex-start">
              {item.timeStamp}
            </Text>
          </VStack>
        </Box>
      )}
      keyExtractor={item => item.id}
    />
  );
}
