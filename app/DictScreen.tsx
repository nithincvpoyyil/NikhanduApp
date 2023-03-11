import * as React from 'react';
import {VStack, ScrollView, HStack, Flex, Container, View} from 'native-base';

import {
  getEmptyDictGrouped,
  getResultsFromDB,
  GroupByDictWord,
} from './utils/DBHelper';
import DisplayGroupedData from './components/displayGroupedData/DisplayGroupedData';
import SimilarResultsHeading from './components/SimilarResultsHeading';
import {hStack1Props, vStack2Props} from './NikhanduLandingScreenStyles';
import {NoItemCard} from './components/NoItemCard';
import {useThemeObject} from './utils/getTheme';
import AnimatedUpperSection from './components/animatedComponents/AnimatedUpperSection';
import {LoadState} from './types';
import {useAnalyticsFlag, useTrack} from './utils/useAnalytics';
import {events} from './utils/analyticsConstants';

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

  const theme = useThemeObject();
  const track = useTrack();
  const analyticsFlag = useAnalyticsFlag();

  React.useEffect(() => {
    if (analyticsFlag) {
      track(events.DICT_SCREEN_OPENED);
    }
  }, [analyticsFlag, track]);

  const isResultLoaded =
    animationFinished &&
    (similarResults.enList.size || exactResults.enList.size);
  const containerBGColor = theme.primaryBG;
  const resultViewBGColor = isResultLoaded
    ? theme.lightColor1
    : theme.primaryBG;

  const clearResults = () => {
    setIsResultLoadingState('init');
    setExactResults(getEmptyDictGrouped());
    setSimilarResults(getEmptyDictGrouped());
  };

  const resetScreen = () => {
    clearResults();
    setSearchKey('');
    setUUID(Date.now());
  };

  const searchDictionaryForWord = (key: string) => {
    if (!key || key.length < 2) {
      clearResults();
      return;
    }
    setIsResultLoadingState('loading');
    if (searchKey === key) {
      const timeOutPromise = new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
      timeOutPromise.then(() => {
        setIsResultLoadingState('loaded');
      });
      return;
    } else {
      setSearchKey(key);
    }

    if (analyticsFlag) {
      track(events.SEARCH, {searchWord: key.toLowerCase()});
    }
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
        if (analyticsFlag) {
          track(events.FAILED_SEARCH, {searchWord: key.toLowerCase()});
        }
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
        bg="transparent"
        position="relative"
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
        borderTopLeftRadius={25}
        borderTopRightRadius={25}
        bg={resultViewBGColor}>
        {resultNode}
      </VStack>
      <HStack {...hStack1Props} bg={resultViewBGColor} safeArea />
    </Flex>
  );
}
