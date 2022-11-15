import * as React from 'react';
import {
  NativeBaseProvider,
  Text,
  VStack,
  Center,
  Heading,
  Button,
  ScrollView,
  HStack,
  Box,
  Circle,
  MoonIcon,
  SunIcon,
  HamburgerIcon,
} from 'native-base';
import {getResultsFromDB, GroupByDictWord} from './utils/DBHelper';
import DisplayGroupedData from './components/DisplayGroupedData';
import SimilarResultsHeading from './components/SimilarResultsHeading';
import {TouchableOpacity} from 'react-native';
import AutoComplete from './components/Autocomplete';

const getEmptyDictGrouped = (): GroupByDictWord => ({
  enList: new Set(),
  enMap: new Map(),
});

export default function NikhanduLandingScreen() {
  const [isDark, setDark] = React.useState(false);
  const [exactResults, setExactResults] = React.useState<GroupByDictWord>(
    getEmptyDictGrouped(),
  );
  const [similarResults, setSimilarResults] = React.useState<GroupByDictWord>(
    getEmptyDictGrouped(),
  );

  const searchDictionaryForWord = (key: string) => {
    getResultsFromDB(key).then(
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
      <Box w="100%" h={'8%'} bg="red.200" />
      <VStack
        h={'17%'}
        space={1}
        alignItems="center"
        w="100%"
        bg="red.200"
        display="flex"
        justifyContent="center">
        <HStack
          w="100%"
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'flex-end'}>
          <TouchableOpacity
            onPress={() => {
              setDark(!isDark);
            }}>
            {isDark ? (
              <Circle size="40px" bg="primary.400">
                <SunIcon />
                <HamburgerIcon />
              </Circle>
            ) : (
              <Circle size="40px" bg="secondary.400">
                <MoonIcon />
              </Circle>
            )}
          </TouchableOpacity>
        </HStack>

        <Box>
          <Heading>
            Malayalam
            <Text color="emerald.500"> Nikhandu</Text>
          </Heading>
          <Text mt="3" fontWeight="medium">
            Malayalam dictionay based on Olam
          </Text>
        </Box>
      </VStack>

      <VStack
        space={1}
        alignItems="center"
        w="100%"
        height={'70%'}
        flexDirection={'column-reverse'}>
        <ScrollView width={'100%'} scrollEnabled scrollsToTop>
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
          borderWidth={1}
          w="100%"
          marginTop={'5%'}
          marginBottom={'5%'}
          marginLeft={0}
          marginRight={0}>
          <AutoComplete onSearchTextSelected={searchDictionaryForWord} />
        </Center>
      </VStack>

      <HStack
        space={5}
        w="100%"
        height={'5%'}
        alignItems={'center'}
        justifyContent={'center'}
        borderWidth={1}
        bg="red.200">
        <Button>Theme</Button>
        <Button>Theme</Button>
        <Button>settings</Button>
        <MoonIcon />
      </HStack>
    </NativeBaseProvider>
  );
}
