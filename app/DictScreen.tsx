import * as React from 'react';
import {
  VStack,
  ScrollView,
  HStack,
  Flex,
  Container,
  View,
  Text,
} from 'native-base';

import {
  getEmptyDictGrouped,
  getResultsFromDB,
  GroupByDictWord,
} from './utils/DBHelper';
import DisplayGroupedData from './components/displayGroupedData/DisplayGroupedData';
import SimilarResultsHeading from './components/SimilarResultsHeading';
import {hStack1Props, vStack2Props} from './NikhanduLandingScreenStyles';
import {NoItemCard} from './components/NoItemCard';
import {getTheme} from './utils/getTheme';
import AnimatedUpperSection from './components/animatedComponents/AnimatedUpperSection';
import {LoadState} from './types';

export default function DictScreen() {
  const [searchKey, setSearchKey] = React.useState('');
  const [isResultLoadingState, setIsResultLoadingState] =
    React.useState<LoadState>('init');

  const [exactResults, setExactResults] = React.useState<GroupByDictWord>(
    getEmptyDictGrouped(),
  );
  const [similarResults, setSimilarResults] = React.useState<GroupByDictWord>(
    getEmptyDictGrouped(),
  );
  const [uuid, setUUID] = React.useState<number>(Date.now());
  const [animationFinished, setAnimationFinished] =
    React.useState<boolean>(false);

  const theme = getTheme();
  const containerBGColor = theme.primaryBG;
  const bottomBGColor =
    animationFinished &&
    (similarResults.enList.size || exactResults.enList.size)
      ? theme.secondryBG
      : theme.primaryBG;

  const clearResults = () => {
    setIsResultLoadingState('init');
    setExactResults(getEmptyDictGrouped());
    setSimilarResults(getEmptyDictGrouped());
  };

  const resetScreen = () => {
    clearResults();
    setIsResultLoadingState('init');
    setSearchKey('');
    setUUID(Date.now());
  };

  const searchDictionaryForWord = (key: string) => {
    if (!key || key.length < 2) {
      clearResults();
      return;
    }

    if (searchKey === key) {
      return;
    } else {
      setSearchKey(key);
    }
    setIsResultLoadingState('loading');
    getResultsFromDB(key).then(
      results => {
        setExactResults(results.exactResults);
        setSimilarResults(results.similarResults);
        setIsResultLoadingState('loaded');
      },
      () => {
        setExactResults(getEmptyDictGrouped());
        setSimilarResults(getEmptyDictGrouped());
        setIsResultLoadingState('error');
      },
    );
  };

  const handleOnPressOfNoResultCardCloseBtn = () => {
    resetScreen();
  };

  const onHeightAnimationDidFinish = () => {
    setAnimationFinished(true);
  };

  let resultNode = <Flex width={'90%'} flexGrow={1} flexShrink={1} />;
  if (similarResults.enList.size || exactResults.enList.size) {
    resultNode = (
      <Container
        position={'relative'}
        alignItems="center"
        justifyContent="center">
        <ScrollView
          w="105%"
          flexGrow={1}
          paddingTop={'10%'}
          paddingBottom={'25%'}
          paddingRight={'2%'}
          paddingLeft={'2%'}
          scrollsToTop={true}
          showsVerticalScrollIndicator={true}>
          <DisplayGroupedData
            groupedData={exactResults}
            isExactResults={true}
          />
          {similarResults.enList.size ? <SimilarResultsHeading /> : null}
          <DisplayGroupedData
            groupedData={similarResults}
            isExactResults={false}
          />
          <View height={'50px'} />
        </ScrollView>
      </Container>
    );
  }

  if (
    isResultLoadingState === 'loaded' &&
    similarResults.enList.size === 0 &&
    exactResults.enList.size === 0
  ) {
    resultNode = (
      <Flex width={'90%'} flexGrow={1} pt={10}>
        <NoItemCard
          isError={false}
          handleOnPress={handleOnPressOfNoResultCardCloseBtn}
        />
      </Flex>
    );
  }

  if (
    isResultLoadingState === 'error' &&
    similarResults.enList.size === 0 &&
    exactResults.enList.size === 0
  ) {
    resultNode = (
      <Flex width={'90%'} flexGrow={1} pt={10}>
        <NoItemCard
          isError={true}
          handleOnPress={handleOnPressOfNoResultCardCloseBtn}
        />
      </Flex>
    );
  }

  return (
    <Flex h={'100%'} w={'100%'} bg={containerBGColor}>
      <AnimatedUpperSection
        key={uuid}
        clearResults={clearResults}
        isResultLoadingState={isResultLoadingState}
        searchDictionaryForWord={searchDictionaryForWord}
        onHeightAnimationDidFinish={onHeightAnimationDidFinish}
      />
      <VStack
        {...vStack2Props}
        shadow={3}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        bg={bottomBGColor}>
        {resultNode}
      </VStack>
      <HStack {...hStack1Props} bg={bottomBGColor} safeArea />
    </Flex>
  );
}
