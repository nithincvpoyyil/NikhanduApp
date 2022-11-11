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
  Box,
  HStack,
  Spacer,
  ScrollView,
} from 'native-base';
import {
  getResultsFromDB,
  GroupByDictWord,
  OlamDBItem,
  typeMap,
} from './utils/DBHelper';

const getEmptyDictGrouped = (): GroupByDictWord => ({
  enList: new Set(),
  enMap: new Map(),
});

const getItemNode = (itemList: OlamDBItem[]) => {
  return (
    <HStack
      space={2}
      padding={'1'}
      justifyContent="flex-start"
      flexWrap={'wrap'}
      width="100%">
      {itemList.map(item => (
        <Box
          paddingTop={'1.5'}
          paddingRight={'3'}
          paddingBottom={'1.5'}
          paddingLeft={'3'}
          key={item._id}
          borderBottomWidth="1"
          marginTop={2}
          height={'auto'}
          overflow="hidden"
          borderColor="coolGray.400"
          borderRadius={'24px'}
          borderWidth="1">
          <Text fontSize="sm" color="coolGray.900" bold>
            {item.malayalam_definition}
          </Text>
        </Box>
      ))}
    </HStack>
  );
};

const getPartOfSpeech = (key: string) => {
  return typeMap.has(key || '')
    ? typeMap.get(key || '')
    : typeMap.get('unknown');
};

const renderGroupedItem = (groupedPOfSMap: Map<string, OlamDBItem[]>) => {
  let items = [];
  for (let [key, valueList] of groupedPOfSMap) {
    let list = (
      <Box
        key={key}
        width="100%"
        borderWidth="1"
        borderColor="transparent"
        padding="10px 10px">
        <Text bold fontSize={'md'}>
          {getPartOfSpeech(key)}
        </Text>
        {getItemNode(valueList)}
      </Box>
    );
    items.push(list);
  }
  return items;
};

const renderGroupedData = (groupedData: GroupByDictWord, isExact: boolean) => {
  if (groupedData.enList.size === 0) {
    return null;
  }
  const {enList, enMap} = groupedData;
  const groupedNode = [];
  let index = 1;
  let boxStyles = isExact
    ? {width: '90%'}
    : {
        width: '90%',
        marginTop: '5',
      };
  let enWordStyles = isExact
    ? {fontSize: 'xl', padding: 1.5, bg: 'tertiary.100', bold: true}
    : {fontSize: 'md', padding: 1, bg: 'info.100', bold: true};
  let heading = !isExact ? (
    <Heading
      adjustsFontSizeToFit
      marginBottom={'1.5'}
      marginTop={'3'}
      color="info.800"
      padding={'1'}>
      <Text fontSize={'md'}>സമാനമായ മറ്റ് വാക്കുകൾ</Text>
      <Spacer />
    </Heading>
  ) : null;
  for (let key of enList) {
    let enWord = isExact ? key : `${index}. ${key}`;
    const nodeItem = (
      <Box
        key={key}
        width="100%"
        borderWidth={'1'}
        borderColor={'trueGray.200'}
        marginTop="2"
        marginBottom="2">
        <Box>
          <Text {...enWordStyles}>{enWord}</Text>
        </Box>
        {renderGroupedItem(enMap.get(key))}
      </Box>
    );
    groupedNode.push(nodeItem);
    index++;
  }
  return (
    <Box {...boxStyles}>
      {heading}
      {groupedNode}
    </Box>
  );
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
    getResultsFromDB(query).then(
      results => {
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
        <Center h="20" rounded="md" width={'100%'} height={'66%'}>
          <ScrollView width={'100%'} scrollEnabled scrollsToTop>
            <Center rounded="md" w="100%">
              {renderGroupedData(exactResults, true)}
              {renderGroupedData(similarResults, false)}
            </Center>
          </ScrollView>
        </Center>
        <Center h="20" bg="#fff" rounded="md" />
      </VStack>
    </NativeBaseProvider>
  );
}
