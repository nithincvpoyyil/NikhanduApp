import * as React from 'react';
import {VStack, Center, ScrollView, HStack, Box, Flex} from 'native-base';
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
import {Animated, Easing} from 'react-native';
import {NoItemCard} from './components/NoItemCard';
const LogoImage = require('../app/assets/images/LandingLogo.png');

export default function DictScreen() {
  const [searchKey, setSearchKey] = React.useState('');
  const [isResultLoadingState, setIsResultLoadingState] = React.useState<
    'init' | 'loading' | 'loaded' | 'error'
  >('init');
  const [isAnimationFinished, setIsAnimationFinished] = React.useState(false);
  const [isAnimated, setIsAnimated] = React.useState(false);

  const [exactResults, setExactResults] = React.useState<GroupByDictWord>(
    getEmptyDictGrouped(),
  );
  const [similarResults, setSimilarResults] = React.useState<GroupByDictWord>(
    getEmptyDictGrouped(),
  );

  const [uuid, setUUID] = React.useState<number>(Date.now());

  const sizeTranslation = React.useRef(new Animated.Value(120)).current;
  const transitionFromZero = React.useRef(new Animated.Value(0)).current;
  const hTransition = React.useRef(new Animated.Value(17)).current;
  const textVisibilityTransition = React.useRef(new Animated.Value(1)).current;
  const percentageTransition = hTransition.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const animatedViewStyles = {
    height: sizeTranslation,
    width: sizeTranslation,
    margin: 10,
    transform: [
      {
        scale: transitionFromZero.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 0.8, 1],
        }),
      },
    ],
  };

  const doAnimation = () => {
    if (!isAnimated) {
      setIsAnimated(true);
      Animated.parallel([
        Animated.timing(textVisibilityTransition, {
          toValue: 0,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(sizeTranslation, {
          toValue: 60,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]).start(({finished}) => {
        setIsAnimationFinished(finished);
        Animated.timing(hTransition, {
          toValue: 10,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(transitionFromZero, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: false,
          }).start(() => {});
        });
      });
    }
  };

  const clearResults = () => {
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
    setSearchKey(key);
    if (!key || key.length < 2) {
      clearResults();
      return;
    }

    if (searchKey === key) {
      return;
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

  let resultNode = <Flex width={'90%'} flexGrow={1} />;
  if (similarResults.enList.size || exactResults.enList.size) {
    resultNode = (
      <ScrollView
        width={'100%'}
        flexGrow={1}
        zoomScale={2}
        paddingTop={'5%'}
        paddingBottom={'20%'}
        scrollsToTop={true}
        showsVerticalScrollIndicator={true}
        borderTopWidth={2}
        borderTopColor={'coolGray.50'}>
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
    );
  }

  if (
    isResultLoadingState === 'loaded' &&
    similarResults.enList.size === 0 &&
    exactResults.enList.size === 0
  ) {
    resultNode = (
      <Flex width={'90%'} flexGrow={1}>
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
      <Flex width={'90%'} flexGrow={1}>
        <NoItemCard
          isError={true}
          handleOnPress={handleOnPressOfNoResultCardCloseBtn}
        />
      </Flex>
    );
  }

  return (
    <Flex h={'100%'} w={'100%'}>
      <Box {...upperBoxStyleProps} />
      <Animated.View {...vStack1Props} h={percentageTransition}>
        <Animated.Image
          alt={'Alternate Text'}
          borderWidth={1}
          borderRadius={100}
          source={LogoImage}
          resizeMode="contain"
          style={{...animatedViewStyles}}
        />
        {!isAnimationFinished ? (
          <Animated.Text
            style={{
              opacity: textVisibilityTransition,
              transform: [{scale: textVisibilityTransition}],
            }}>
            Offline English-Malayalam Dictionay
          </Animated.Text>
        ) : null}
      </Animated.View>

      <VStack {...vStack2Props}>
        {resultNode}
        <Center
          w="100%"
          marginTop={'5%'}
          marginBottom={'6%'}
          marginLeft={0}
          marginRight={0}>
          <AutoComplete
            key={uuid}
            onSearchTextSelected={searchDictionaryForWord}
            isResultLoading={isResultLoadingState === 'loading'}
            onQueryInvalid={clearResults}
            onInputFocus={doAnimation}
          />
        </Center>
      </VStack>

      <HStack {...hStack1Props} />
    </Flex>
  );
}
