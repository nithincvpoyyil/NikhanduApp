import * as React from 'react';
import {
  Text,
  VStack,
  Center,
  Heading,
  ScrollView,
  HStack,
  Box,
} from 'native-base';
import {
  getEmptyDictGrouped,
  getResultsFromDB,
  GroupByDictWord,
} from './utils/DBHelper';
import DisplayGroupedData from './components/DisplayGroupedData';
import SimilarResultsHeading from './components/SimilarResultsHeading';
import AutoComplete from './components/Autocomplete';
import {
  hStack1Props,
  upperBoxStyleProps,
  vStack1Props,
  vStack2Props,
} from './NikhanduLandingScreenStyles';

export default function DictScreen() {
  const [searchKey, setSearchKey] = React.useState('');
  const [isResultLoading, setIsResultLoading] = React.useState(false);
  const [exactResults, setExactResults] = React.useState<GroupByDictWord>(
    getEmptyDictGrouped(),
  );
  const [similarResults, setSimilarResults] = React.useState<GroupByDictWord>(
    getEmptyDictGrouped(),
  );

  const clearResults = () => {
    setExactResults(getEmptyDictGrouped());
    setSimilarResults(getEmptyDictGrouped());
  };

  const searchDictionaryForWord = (key: string) => {
    setSearchKey(key);
    if (!key || key.length < 2) {
      clearResults();
      return;
    }

    if (searchKey === key) {
      return;
    }
    setIsResultLoading(true);
    getResultsFromDB(key).then(
      results => {
        setExactResults(results.exactResults);
        setSimilarResults(results.similarResults);
        setIsResultLoading(false);
      },
      () => {
        setExactResults(getEmptyDictGrouped());
        setSimilarResults(getEmptyDictGrouped());
        setIsResultLoading(false);
      },
    );
  };

  return (
    <>
      <Box {...upperBoxStyleProps} />
      <VStack {...vStack1Props}>
        <HStack
          w="100%"
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'flex-end'}>
          {/*  */}
        </HStack>

        <Center>
          <Heading>
            <Text size={'2xl'} color="emerald.500">
              Nikhandu
            </Text>
          </Heading>
          <Text mt="3" fontWeight="medium">
            Offline English-Malayalam Dictionay
          </Text>
        </Center>
      </VStack>

      <VStack {...vStack2Props}>
        <ScrollView width={'100%'}>
          <Center>
            <DisplayGroupedData
              groupedData={exactResults}
              isExactResults={true}
            />
            <DisplayGroupedData
              groupedData={similarResults}
              isExactResults={false}
              renderHeading={() => <SimilarResultsHeading />}
            />
          </Center>
          <Center>
            <Box w="100%" h={'50%'} />
          </Center>
        </ScrollView>
        <Center
          w="100%"
          marginTop={'5%'}
          marginBottom={'6%'}
          marginLeft={0}
          marginRight={0}>
          <AutoComplete
            onSearchTextSelected={searchDictionaryForWord}
            isResultLoading={isResultLoading}
            onQueryInvalid={clearResults}
          />
        </Center>
      </VStack>

      <HStack {...hStack1Props} />
    </>
  );
}
