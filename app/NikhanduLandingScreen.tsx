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
  FlatList,
  Box,
  HStack,
  Spacer,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {
  dbPathExists,
  GroupByDictWord,
  OlamDBItem,
  typeMap,
} from './utils/DBHelper';

const getEmptyDictGrouped = (): GroupByDictWord => ({
  enList: new Set(),
  enMap: new Map(),
});

const renderGroupedItem = (groupedPOfSMap: Map<string, OlamDBItem[]>) => {
  let items = [];
  for (let [key, valueList] of groupedPOfSMap) {
    let list = (
      <Container key={key}>
        <Text>{key}</Text>
        <FlatList
          scrollsToTop={true}
          width={'100%'}
          height={'100%'}
          data={valueList}
          renderItem={({item}) => {
            let partofSp = typeMap.has(item.part_of_speech || '')
              ? typeMap.get(item.part_of_speech || '')
              : typeMap.get('unknown');

            return (
              <TouchableOpacity>
                <Box
                  borderBottomWidth="1"
                  marginTop={5}
                  height={'50px'}
                  overflow="hidden"
                  borderColor="coolGray.200"
                  borderWidth="1"
                  _dark={{
                    borderColor: 'coolGray.600',
                    backgroundColor: 'gray.700',
                  }}
                  _web={{
                    shadow: 2,
                    borderWidth: 0,
                  }}
                  _light={{
                    backgroundColor: 'gray.50',
                  }}>
                  <HStack justifyContent="space-between">
                    <VStack>
                      <Text fontSize="sm" color="coolGray.800" bold>
                        {item.malayalam_definition}
                      </Text>
                      <Text fontSize="xs" color="coolGray.600">
                        {partofSp}
                      </Text>
                    </VStack>
                    <Spacer />
                  </HStack>
                </Box>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item._id + item.english_word}
        />
      </Container>
    );
    items.push(list);
  }
  return items;
};

const renderGroupedData = (groupedData: GroupByDictWord) => {
  const {enList, enMap} = groupedData;
  const groupedNode = [];
  for (let key of enList) {
    const item = renderGroupedItem(enMap.get(key));
    const nodeItem = (
      <Container key={key}>
        <Text>{key}</Text>
      </Container>
    );
    groupedNode.push(nodeItem);
  }
  return groupedNode;
};

export default function NikhanduLandingScreen() {
  const [query, setQuery] = React.useState('');
  const [exactResults, setExactResults] = React.useState<GroupByDictWord>(
    getEmptyDictGrouped(),
  );
  const [similarResults, setSimilarResults] = React.useState<GroupByDictWord>(
    getEmptyDictGrouped(),
  );
  const onSearchHandler = (queryVal: string) => {
    setQuery(queryVal);
  };

  React.useEffect(() => {
    return () => {};
  }, [query]);

  const onPressHandler = () => {
    dbPathExists(query).then(
      results => {
        console.log('result', results.exactResults.enList.size);
        setExactResults(results.exactResults);
        setSimilarResults(results.similarResults);
      },
      () => {
        setExactResults(getEmptyDictGrouped());
        setSimilarResults(getEmptyDictGrouped());
      },
    );
  };

  return (
    <NativeBaseProvider>
      <VStack space={0} alignItems="center" w="100%">
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
            InputRightElement={<Button onPress={onPressHandler}>Search</Button>}
          />
        </Center>

        <Center bg="#fff" rounded="md" w="100%">
          {renderGroupedData(exactResults)}
        </Center>

        <Center bg="#fff" rounded="md" w="100%">
          {renderGroupedData(similarResults)}
        </Center>
      </VStack>
    </NativeBaseProvider>
  );
}
