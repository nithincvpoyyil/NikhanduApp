import * as React from 'react';
import {
  NativeBaseProvider,
  Text,
  Input,
  VStack,
  Center,
  Container,
  Heading,
  Button,
  ScrollView,
} from 'native-base';
import ListLoader from './components/ListLoader';

import DictListView from './components/DictListView';
import {dao} from './olam-db/OlamDao';

export default function NikhanduLandingScreen() {
  const [query, setQuery] = React.useState('');
  const [loading] = React.useState(false);
  const onSearchHandler = (queryVal: string) => {
    setQuery(queryVal);
  };

  React.useEffect(() => {
    return () => {};
  }, [query]);

  return (
    <NativeBaseProvider>
      <VStack space={4} alignItems="center" w="100%">
        <Center h="20" bg="#fff" rounded="md" />
        <Center h="20" bg="#fff" rounded="md">
          <Container>
            <Heading>
              Malayalam
              <Text color="emerald.500"> Nikhandu</Text>
            </Heading>
            <Text mt="3" fontWeight="medium">
              Malayalam dictionay based on Olam
            </Text>
          </Container>
        </Center>

        <Center h="20" bg="#fff" rounded="md">
          <Input
            size="2xl"
            w="90%"
            placeholder="Type your english keyword"
            onChangeText={e => {
              onSearchHandler(e);
            }}
            variant="underlined"
            InputRightElement={
              <Button
                onPress={() => {
                  dao();
                }}>
                Search
              </Button>
            }
          />
        </Center>

        <Center bg="#fff" rounded="md" w="100%">
          {loading ? (
            <ListLoader />
          ) : (
            <ScrollView w="90%">{/* <DictListView /> */}</ScrollView>
          )}
        </Center>
      </VStack>
    </NativeBaseProvider>
  );
}
